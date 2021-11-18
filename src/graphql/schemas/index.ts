import path from "path";
import { DocumentNode } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { enchanceDirectives } from "@backend/graphql/directives";
import { DIRECTIVES, addToSchema } from "@graphql-codegen/typescript-mongodb";
import { loadTypedefsSync } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import gql from "graphql-tag";
import { inspect } from "util";

export const schemaWithResolvers = async () =>
  makeExecutableSchema({
    ...schemaDef,
    resolvers: (await import("@backend/graphql/resolvers")).default,
  });

const typeDefs = loadTypedefsSync(path.join(__dirname, "./**/*.gql"), {
  loaders: [new GraphQLFileLoader()],
}).map((source) => source.document) as DocumentNode[];

// console.log(DIRECTIVES, ...typeDefs);

// const typeDefss = mergeTypeDefs(typeDefs, {
//   // ignoreFieldConflicts: true,
//   // reverseDirectives: true,
// });

export const schemaDef = {
  typeDefs: [...typeDefs],
};

// console.log(inspect(DIRECTIVES, true, 5));
//
// enchanceDirectives(schemaDef);

export default makeExecutableSchema(schemaDef);
