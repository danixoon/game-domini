import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: number;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type IdDbObject = {
  __typename?: 'IdDbObject';
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  test: Scalars['String'];
};


export type MutationTestArgs = {
  input: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type TestVariables = Exact<{
  username: Scalars['String'];
}>;


export type Test = { __typename?: 'Mutation', test: string };

export type FetchUserVariables = Exact<{ [key: string]: never; }>;


export type FetchUser = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string } | null | undefined };


export const TestDocument = gql`
    mutation test($username: String!) {
  test(input: $username)
}
    `;
export const FetchUserDocument = gql`
    query fetchUser {
  user {
    id
    username
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    test(variables: TestVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Test> {
      return withWrapper((wrappedRequestHeaders) => client.request<Test>(TestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'test');
    },
    fetchUser(variables?: FetchUserVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FetchUser> {
      return withWrapper((wrappedRequestHeaders) => client.request<FetchUser>(FetchUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchUser');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;