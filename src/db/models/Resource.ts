import * as mongoose from "mongoose";
import { Player, ResourceDbObject } from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
const { Types } = mongoose.Schema;

const resourceSchema = createSchema<ResourceDbObject>({
  amount: {
    type: Types.Number,
    required: true,
  },
  playerId: {
    type: Types.ObjectId,
    ref: "Player",
    required: true,
  },
  resourceType: {
    type: Types.String,
    required: true,
  },
});

resourceSchema.index({ playerId: 1, resourceType: 1 }, { unique: true });

export const ResourceModel = createModel("Resource", resourceSchema);
