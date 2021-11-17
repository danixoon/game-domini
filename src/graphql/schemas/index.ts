import path from "path";
import { DocumentNode } from "graphql";
import {
  loadTypedefsSync,
  GraphQLFileLoader,
  mergeTypeDefs,
  makeExecutableSchema,
} from "graphql-tools";
import { enchanceDirectives } from "@backend/graphql/directives";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";

export const schemaWithResolvers = async () =>
  makeExecutableSchema({
    ...schemaDef,
    resolvers: (await import("@backend/graphql/resolvers")).default,
  });

const typeDefs = loadTypedefsSync(path.join(__dirname, "../schemas/**/*.gql"), {
  loaders: [new GraphQLFileLoader()],
}).map((source) => source.document) as DocumentNode[];

export const schemaDef = {
  typeDefs: mergeTypeDefs([DIRECTIVES, ...typeDefs]),
};

enchanceDirectives(schemaDef);

export default makeExecutableSchema(schemaDef);
