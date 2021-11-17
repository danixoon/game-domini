import * as mongoose from "mongoose";
// import { User, UserDbObject } from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
const { Types } = mongoose.Schema;

type UserSchema = any & {
  password: string;
};

const userSchema = createSchema<UserSchema>({
  password: {
    type: Types.String,
    required: true,
  },
  username: {
    type: Types.String,
    required: true,
    unique: true,
  },
  role: {
    type: Types.String,
    required: true,
  },
});

export const UserModel = createModel<UserSchema>("User", userSchema);
