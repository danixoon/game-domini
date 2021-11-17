import { DocumentNode } from "graphql";
import { IExecutableSchemaDefinition, mergeTypeDefs } from "graphql-tools";

const enchanceDirective = (
  directive: () => ReturnType<Backend.GraphQL.DirectiveCreator>,
  schemaDef: IExecutableSchemaDefinition<Backend.GraphQL.GraphQLContext>
) => {
  const schemaTransformers = schemaDef.schemaTransforms || [];

  const { typeDefs, transformer } = directive();

  schemaTransformers.push(transformer);

  schemaDef.typeDefs = mergeTypeDefs([
    (schemaDef.typeDefs as DocumentNode) || "",
    typeDefs,
  ]);
  schemaDef.schemaTransforms = schemaTransformers;
};

export const enchanceDirectives = (
  schemaDef: IExecutableSchemaDefinition<Backend.GraphQL.GraphQLContext>
) => {
  // enchanceDirective(() => upperDirective("upper"), schemaDef);
};
