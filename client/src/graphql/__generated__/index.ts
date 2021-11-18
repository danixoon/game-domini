import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '../fetcher';
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
  Void: any;
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
  test: What;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryUsersArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type What = {
  __typename?: 'What';
  id: Scalars['String'];
};

export type TestVariables = Exact<{
  username: Scalars['String'];
}>;


export type Test = { __typename?: 'Mutation', test: string };

export type FetchUserVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchUser = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string } | null | undefined> };


export const TestDocument = `
    mutation test($username: String!) {
  test(input: $username)
}
    `;
export const useTest = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Test, TError, TestVariables, TContext>) =>
    useMutation<Test, TError, TestVariables, TContext>(
      'test',
      (variables?: TestVariables) => fetcher<Test, TestVariables>(TestDocument, variables)(),
      options
    );
export const FetchUserDocument = `
    query fetchUser($id: ID!) {
  users(id: $id) {
    id
    username
  }
}
    `;
export const useFetchUser = <
      TData = FetchUser,
      TError = unknown
    >(
      variables: FetchUserVariables,
      options?: UseQueryOptions<FetchUser, TError, TData>
    ) =>
    useQuery<FetchUser, TError, TData>(
      ['fetchUser', variables],
      fetcher<FetchUser, FetchUserVariables>(FetchUserDocument, variables),
      options
    );