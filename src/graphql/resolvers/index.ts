import { createResolver } from "./utils";
import scalars from "./scalars";
import { UserModel } from "@backend/db/models/User";
import { invalidQueryError } from "@backend/graphql/errors";
import { Resolvers } from "../generated";
import { defaultTypeResolver, GraphQLTypeResolver } from "graphql";

const resolver: Partial<Resolvers> = {
  Query: {
    test: async () => ({ id: "2" }),
    user: async (_, {}) => UserModel.findOne().exec(),
    users: (_, { id }) => UserModel.find().exec(),
  },
  Mutation: {
    test: (_, {}) => "ok",
  },
  User: { id: (v) => (v as any)._id, username: (v) => v.username },
  ...scalars,
};

export default resolver;
