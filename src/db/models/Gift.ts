import * as mongoose from "mongoose";
import {
  GiftDbObject,
  Player,
  ResourceDbObject,
} from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
const { Types } = mongoose.Schema;

const giftSchema = createSchema<GiftDbObject>({
  amount: {
    type: Types.Number,
    required: true,
  },
  authorId: {
    type: Types.ObjectId,
    required: true,
    ref: "Player",
  },
  targetId: {
    type: Types.ObjectId,
    required: true,
    ref: "Player",
  },
  createdAt: {
    type: Types.Date,
    required: true,
    default: () => new Date(),
  },
  resourceType: {
    type: Types.String,
    required: true,
  },
});

export const GiftModel = createModel("Gift", giftSchema);
