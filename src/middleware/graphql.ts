import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schemaWithResolvers } from "@backend/graphql/schemas";

export default () => {
  const schema = schemaWithResolvers();
  return async (req: express.Request, res: express.Response) => {
    return graphqlHTTP({
      schema: await schema,
      graphiql: true,
    })(req, res);
  };
};
