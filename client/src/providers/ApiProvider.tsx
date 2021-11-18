// import { getSdk, Sdk } from "@generated";
import { AxiosError } from "axios";
import { GraphQLFormattedError } from "graphql";
import { GraphQLClient } from "graphql-request";
// import { useQuery } from "graphql/query";
import { useIsFirstEffect } from "hooks/useIsFirstEffect";
import * as React from "react";
import { useQueryClient } from "react-query";
// import { useHistory } from "react-router-dom";

export class BackendError extends Error {
  constructor(message: string, payload: { code: number | null }) {
    super(message);
    this.message = message;
    Object.assign(this, payload);
  }
}

const parseError = (error: GraphQLFormattedError[]) => {
  return new BackendError(error[0].message, {
    code: (error[0].extensions?.code as any) || null,
  });
};

const getClient = () => {
  return new GraphQLClient("/graphql");
};

type ApiContextValue = {
  // api: Sdk;
};

export const ApiContext = React.createContext<ApiContextValue>({
  // api: getSdk(getClient()),
});

export const ApiProvider: React.FC<{}> = (props) => {
  const { children } = props;

  const client = getClient();

  //@ts-ignore
  const api = getSdk(client, async (fn) => {
    try {
      const result = await fn();
      return result;
    } catch (err) {
      const e = err as any;
      throw parseError(e.response.errors);
    }
  });

  const cache = useQueryClient();

  return (
    <ApiContext.Provider
      value={{
        api,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
