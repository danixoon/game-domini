import * as mongoose from "mongoose";
import { Player, PlayerDbObject, Property } from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
import { ResourceModel } from "./Resource";
const { Types } = mongoose.Schema;

export const propertySchema = createSchema<Property>({
  amount: { type: Types.Number },
  propertyType: { type: Types.String },
});

const playerSchema = createSchema<PlayerDbObject>({
  username: {
    type: Types.String,
    required: true,
    unique: true,
  },
  properties: [
    {
      type: propertySchema,
    },
  ],
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
