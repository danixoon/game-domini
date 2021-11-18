import * as mongoose from "mongoose";
// import { User, UserDbObject } from "@backend/graphql/generated";
import { createModel, createSchema } from "@backend/db/utils";
const { Types } = mongoose.Schema;

type UserSchema = {
  username: string;
};

const userSchema = createSchema<UserSchema>({
  username: {
    type: Types.String,
    required: true,
    unique: true,
  },
});

export const UserModel = createModel<UserSchema>("User", userSchema);
