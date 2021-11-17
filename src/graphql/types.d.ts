namespace Backend.GraphQL {
  type GraphQLSchema = import("graphql").GraphQLSchema;
  type GraphQLFieldConfig<T, K> = import("graphql").GraphQLFieldConfig<T, K>;

  declare type GraphQLContext = {
    role: Role;
    id: string;
  };

  declare type DirectiveCreator = (directiveName: string) => {
    typeDefs: string;
    transformer: (schema: GraphQLSchema) => GraphQLSchema;
  };

  declare type FieldConfig = GraphQLFieldConfig<any, GraphQLContext>;
}
