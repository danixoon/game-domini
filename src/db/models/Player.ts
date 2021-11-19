import * as mongoose from "mongoose";
import {
  Player,
  PlayerDbObject,
  ResourceType,
  Scalars,
} from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
import { ResourceModel } from "./Resource";
const { Types } = mongoose.Schema;

export const defaultProperties: Partial<Scalars["Property"]> = {
  LUCK: 100,
};

const playerSchema = createSchema<PlayerDbObject>({
  username: {
    type: Types.String,
    required: true,
    unique: true,
  },
  properties: {
    type: Types.Mixed,
    default: defaultProperties,
  },
});

playerSchema.pre("save", async function (err) {
  const avaliableResources: ResourceType[] = ["CRYSTAL", "GOLD"];
  const created = await ResourceModel.create(
    avaliableResources.map((type) => ({
      resourceType: type,
      amount: 0,
      playerId: this.id,
    }))
  );
});

playerSchema.virtual("resources", {
  ref: "Resource",
  localField: "_id",
  foreignField: "playerId",
});

playerSchema.virtual("gifts", {
  ref: "Gift",
  localField: "_id",
  foreignField: "targetId",
});

export const PlayerModel = createModel("Player", playerSchema);
