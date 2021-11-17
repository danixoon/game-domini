import { createResolver } from "./utils";
import scalars from "./scalars";
import { UserModel } from "@backend/db/models/User";
import bcrypt from "bcrypt";
import { invalidQueryError } from "@backend/graphql/errors";

import { ObjectID } from "mongodb";

const resolver: any = {
  Query: {},
  Mutation: {},
  User: createResolver(),
  ...scalars,
};

export default resolver;
