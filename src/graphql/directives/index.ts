import { DocumentNode } from "graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { IExecutableSchemaDefinition } from "@graphql-tools/schema";

// const enchanceDirective = (
//   directive: () => ReturnType<Backend.GraphQL.DirectiveCreator>,
//   schemaDef: IExecutableSchemaDefinition<Backend.GraphQL.GraphQLContext>
// ) => {
//   const schemaTransformers = schemaDef.schemaTransforms || [];

//   const { typeDefs, transformer } = directive();

//   schemaTransformers.push(transformer);

//   schemaDef.typeDefs = mergeTypeDefs([
//     (schemaDef.typeDefs as DocumentNode) || "",
//     typeDefs,
//   ]);
//   schemaDef.schemaTransforms = schemaTransformers;
// };

export const enchanceDirectives = (
  schemaDef: IExecutableSchemaDefinition<Backend.GraphQL.GraphQLContext>
) => {
  // enchanceDirective(() => upperDirective("upper"), schemaDef);
};
