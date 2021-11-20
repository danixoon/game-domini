import PQueue from "p-queue";
import {
  // Scalars,
  PropertyType,
  ResourceType,
} from "@backend/graphql/generated";
import { ObjectId } from "bson";
import { PlayerModel, GiftModel, ResourceModel } from "./models";

export const buff = async (
  playerId: string,
  resourceType: ResourceType,
  amount: number
) => {
  const model = await ResourceModel.aggregate([
    {
      $match: { resourceType, playerId: new ObjectId(playerId) },
    },
    { $set: { amount: { $sum: ["$amount", amount] }, resourceType } },
    {
      $set: {
        amount: {
          $cond: { if: { $lte: ["$amount", 0] }, then: 0, else: "$amount" },
        },
      },
    },
    {
      $merge: {
        into: "resources",
        on: "_id",
        whenMatched: "replace",
        whenNotMatched: "insert",
      },
    },
  ]).exec();
  return model;
};

export const buffByProperty = async (
  property: PropertyType,
  treshold: number,
  resourceType: ResourceType,
  amount: number
) => {
  const model = await ResourceModel.aggregate([
    {
      $lookup: {
        from: "players",
        localField: "playerId",
        foreignField: "_id",
        as: "players",
      },
    },
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        [`players.properties.${property}`]: { $ne: null, $gte: treshold },
        resourceType,
      },
    },
    { $set: { amount: { $sum: ["$amount", amount] } } },
    { $unset: "players" },
    {
      $set: {
        amount: {
          $cond: { if: { $lte: ["$amount", 0] }, then: 0, else: "$amount" },
        },
      },
    },
    {
      $merge: {
        into: "resources",
        on: "_id",
        whenMatched: "replace",
        whenNotMatched: "fail",
      },
    },
  ]).exec();

  return model;
};

const giftQueue = new PQueue({ concurrency: 1, autoStart: true });
export const sendGift = (
  targetIds: string[],
  authorId: string,
  resourceType: ResourceType,
  amount: number
) => {
  if (targetIds.includes(authorId))
    throw new Error("Невозможно отправить подарок самому себе.");
  if (amount <= 0)
    throw new Error("Указано некорректное количество ресурса подарка.");

  const send = async () => {
    const targets = await PlayerModel.find({ _id: { $in: targetIds } });

    if (targets.length < targetIds.length)
      throw new Error("Целевые идентифткаторы игроков некорректны");

    const author = await PlayerModel.findById(authorId).populate("resources");
    if (!author) throw new Error("Отправителя-игрока не существует");

    const timeOffset = new Date().getUTCMilliseconds() - 24 * 60 * 60 * 1000;
    const giftAmount = await GiftModel.find({
      createdAt: { $gte: new Date(timeOffset) },
      authorId,
    })
      .count()
      .exec();

    if (giftAmount >= 10)
      throw new Error("Достигнуто максимальное количество подарков");
    else if (giftAmount + targetIds.length > 10)
      throw new Error(
        `Невозможно отправить ${targetIds.length} единиц подарков, это привысит максимальное количество`
      );

    const targetResource = author.resources.find(
      (res) => res.resourceType === resourceType
    );
    if (!targetResource || targetResource.amount <= amount)
      throw new Error("У вас недостаточно ресурса для подарка");

    const gifts = await GiftModel.create(
      targets.map((target) => ({
        amount,
        authorId,
        targetId: target.id,
        resourceType,
      }))
    );

    return gifts;
  };

  return giftQueue.add(send);
};

export const clearDb = async () => {
  return Promise.all(
    [
      GiftModel.deleteMany({}),
      ResourceModel.deleteMany({}),
      PlayerModel.deleteMany({}),
    ].map((a) => a.exec())
  );
};

export const fillDb = async () => {
  const players = [
    { username: "Bob", properties: { AGILITY: 49 } },
    { username: "Alice" },
    { username: "Dan" },
  ];

  const [a, b, c] = await PlayerModel.create(players);

  await Promise.all([
    buff(a.id, "CRYSTAL", 10),
    buff(a.id, "GOLD", 50),
    buff(b.id, "CRYSTAL", 200),
    buff(b.id, "GOLD", 10000),
    buff(b.id, "GOLD", 15000),
    buff(b.id, "CRYSTAL", 9),
  ]);

  await buffByProperty("LUCK", 48, "GOLD", 100);
};
