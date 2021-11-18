import path from "path";
import { DocumentNode } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { enchanceDirectives } from "@backend/graphql/directives";
import { DIRECTIVES, addToSchema } from "@graphql-codegen/typescript-mongodb";
import { loadTypedefsSync } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import gql from "graphql-tag";

export const schemaWithResolvers = async () =>
  makeExecutableSchema({
    ...schemaDef,
    resolvers: (await import("@backend/graphql/resolvers")).default,
  });

const typeDefs = loadTypedefsSync(path.join(__dirname, "../schemas/**/*.gql"), {
  loaders: [new GraphQLFileLoader()],
}).map((source) => source.document) as DocumentNode[];

// console.log(DIRECTIVES, ...typeDefs);

const typeDefss = mergeTypeDefs(typeDefs);
export const schemaDef = {
  typeDefs: typeDefss,
};

// enchanceDirectives(schemaDef);

export default makeExecutableSchema(schemaDef);
