import scalars from "./scalars";
import { Resolvers } from "../generated";
import {
  GiftModel,
  PlayerModel,
  ResourceModel,
} from "@backend/db/models/index";

const mergeItems = <T, K>(
  getKey: (item: T) => string,
  merger: (array: K | null, item: T) => K,
  arrays: T[]
) => {
  const map = new Map<string, K>();
  for (const item of arrays) {
    const key = getKey(item);
    const existing = map.get(key) ?? null;
    map.set(key, merger(existing, item));
  }
  return Array.from(map.values());
};

const resolver: Partial<Resolvers> = {
  Query: {
    players: async (_, {}, c, f) => {
      const players = await PlayerModel.find()
        .populate("gifts")
        .populate("resources")
        .exec();

      return players;
    },
    resources: async (_, { id }) => {
      const [resources, gifts] = await Promise.all([
        ResourceModel.find({ playerId: id }),
        GiftModel.find({ targetId: id }),
      ]);

      const totalResources = mergeItems<any, any>(
        (item) => item.resourceType,
        (merged, item) => ({
          resourceType: item.resourceType,
          amount: merged?.amount ? merged?.amount + item.amount : item.amount,
        }),
        [...resources, ...gifts]
      );

      return totalResources;
    },
    player: (_, { id }) => PlayerModel.findById(id).exec(),
    gifts: (_, { filter }) => {
      const query = GiftModel.find();
      if (filter.authorIds) query.in("authorId", [filter.authorIds]);
      if (filter.before)
        query.lte("createdAt", filter.before.getMilliseconds());
      if (filter.after) query.gte("createdAt", filter.after.getMilliseconds());
      return query.exec();
    },
  },
  Mutation: {
    gift: (v) => ({} as any),
  },
  GiftMutation: {
    send: async (
      _,
      { payload: { amount, authorId, targetId, resourceType } }
    ) => {
      const target = await PlayerModel.findById(targetId);
      if (!target) throw new Error("Целевого игрока не существует");

      const author = await PlayerModel.findById(authorId).populate("resources");
      if (!author) throw new Error("Отправителя-игрока не существует");

      const timeOffset = Date.now() - 24 * 60 * 60 * 1010;
      const giftAmount = await GiftModel.find({
        createdAt: { $gte: new Date(timeOffset) },
      })
        .count()
        .exec();

      if (giftAmount >= 10)
        throw new Error("Достигнуто максимальное количество подарков");

      const targetResource = author.resources.find(
        (res) => res.resourceType === resourceType
      );
      if (!targetResource || targetResource.amount <= amount)
        throw new Error("У вас недостаточно ресурса для подарка");

      const gift = await GiftModel.create({
        amount,
        authorId,
        targetId,
        resourceType,
      });

      return gift;
    },
  },
  ...scalars,
};

export default resolver;
