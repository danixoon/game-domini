import scalars from "./scalars";
import { Player, Resolvers } from "../generated";
import {
  GiftModel,
  PlayerModel,
  ResourceModel,
} from "@backend/db/models/index";
import { sendGift } from "@backend/db/queries";

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
    gifts: async (_, { filter }) => {
      const query = GiftModel.find();
      if (filter.authorIds) query.in("authorId", [filter.authorIds]);
      if (filter.targetIds) query.in("targetId", [filter.targetIds]);
      if (filter.before)
        query.lte("createdAt", filter.before.getMilliseconds());
      if (filter.after) query.gte("createdAt", filter.after.getMilliseconds());
      const gifts = await query.exec();
      return gifts;
    },
    latestGifts: async (_, {}) => {
      const query = GiftModel.find().gte("createdAt", Date.now() - 60 * 1000);
      const gifts = await query.exec();
      return gifts;
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
      const [gift] = await sendGift([targetId], authorId, resourceType, amount);
      return gift;
    },
  },
  ...scalars,
};

export default resolver;
