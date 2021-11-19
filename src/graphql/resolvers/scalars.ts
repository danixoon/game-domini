import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../generated";
import { createResolver } from "./utils";

export default {
  IdDbObject: createResolver<Resolvers["IdDbObject"]>(),
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date-time value",
    serialize(value: Date) {
      return value.getTime();
    },
    parseValue(value: string) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      } else if (ast.kind === Kind.STRING) return new Date(ast.value);
      return null;
    },
  }),
  Void: new GraphQLScalarType({
    name: "Void",
    description: "Null value",
    serialize(value: null) {
      return null;
    },
    parseValue(value: null) {
      return null;
    },
    parseLiteral(ast) {
      return null;
    },
  }),
};
