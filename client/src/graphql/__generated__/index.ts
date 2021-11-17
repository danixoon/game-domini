import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type IdDbObject = {
  __typename?: 'IdDbObject';
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Тест */
  test: Scalars['String'];
};


export type MutationTestArgs = {
  input: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Возвращает данные об активном пользователе */
  user?: Maybe<User>;
};

/** Пользователь  */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  /** Имя пользователя */
  username: Scalars['String'];
};

export type TestVariables = Exact<{
  username: Scalars['String'];
}>;


export type Test = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'test'>
);

export type FetchUserVariables = Exact<{ [key: string]: never; }>;


export type FetchUser = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


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

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    test(variables: TestVariables): Promise<Test> {
      return withWrapper(() => client.request<Test>(print(TestDocument), variables));
    },
    fetchUser(variables?: FetchUserVariables): Promise<FetchUser> {
      return withWrapper(() => client.request<FetchUser>(print(FetchUserDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;