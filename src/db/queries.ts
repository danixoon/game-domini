import {} from "@backend/graphql/generated";
import { PlayerModel, GiftModel, ResourceModel } from "./models";

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
    { username: "Bob" },
    { username: "Alice" },
    { username: "Dan" },
  ];

  const [a, b, c] = await PlayerModel.create(players);

  const resources = [
    { resourceType: "GOLD", amount: 10, playerId: a.id },
    { resourceType: "CRYSTAL", amount: 5, playerId: a.id },
    { resourceType: "GOLD", amount: 15, playerId: b.id },
  ];

  await ResourceModel.create(resources);
};
