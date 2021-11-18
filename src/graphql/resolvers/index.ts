import { createResolver } from "./utils";
import scalars from "./scalars";
import { UserModel } from "@backend/db/models/User";
import { invalidQueryError } from "@backend/graphql/errors";

const resolver: any = {
  Query: {},
  Mutation: {},
  User: createResolver(),
  ...scalars,
};

export default resolver;
