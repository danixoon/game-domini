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
  Property: any;
  Void: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Gift = {
  __typename?: 'Gift';
  resourceType: ResourceType;
  targetId: Scalars['ID'];
  authorId: Scalars['ID'];
  amount: Scalars['Int'];
  createdAt: Scalars['Date'];
};

export type GiftFilter = {
  after?: InputMaybe<Scalars['Date']>;
  before?: InputMaybe<Scalars['Date']>;
  authorIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type GiftMutation = {
  __typename?: 'GiftMutation';
  send: Gift;
};


export type GiftMutationSendArgs = {
  payload: SendGiftPayload;
};

export type IdDbObject = {
  __typename?: 'IdDbObject';
  _id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  gift?: Maybe<GiftMutation>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID'];
  username: Scalars['String'];
  properties: Scalars['Property'];
  resources: Array<Resource>;
  gifts: Array<Gift>;
};

export enum PropertyType {
  Strength = 'STRENGTH',
  Stealth = 'STEALTH',
  Agility = 'AGILITY',
  Luck = 'LUCK'
}

export type Query = {
  __typename?: 'Query';
  players: Array<Player>;
  player?: Maybe<Player>;
  gifts: Array<Gift>;
  resources: Array<Resource>;
};


export type QueryPlayerArgs = {
  id: Scalars['ID'];
};


export type QueryGiftsArgs = {
  filter: GiftFilter;
};


export type QueryResourcesArgs = {
  id: Scalars['ID'];
};

export type Resource = {
  __typename?: 'Resource';
  resourceType: ResourceType;
  amount: Scalars['Int'];
  playerId: Scalars['ID'];
};

export enum ResourceType {
  Gold = 'GOLD',
  Crystal = 'CRYSTAL'
}

export type SendGiftPayload = {
  targetId: Scalars['ID'];
  authorId: Scalars['ID'];
  resourceType: ResourceType;
  amount: Scalars['Int'];
};

export type SendGiftVariables = Exact<{
  type: ResourceType;
  amount: Scalars['Int'];
  authorId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type SendGift = { __typename?: 'Mutation', gift?: { __typename?: 'GiftMutation', send: { __typename?: 'Gift', amount: number } } | null | undefined };

export type FetchPlayerVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchPlayer = { __typename?: 'Query', player?: { __typename?: 'Player', id: string, username: string } | null | undefined };

export type FetchResourcesVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchResources = { __typename?: 'Query', resources: Array<{ __typename?: 'Resource', resourceType: ResourceType, amount: number }> };


export const SendGiftDocument = `
    mutation sendGift($type: ResourceType!, $amount: Int!, $authorId: ID!, $targetId: ID!) {
  gift {
    send(
      payload: {resourceType: $type, amount: $amount, authorId: $authorId, targetId: $targetId}
    ) {
      amount
    }
  }
}
    `;
export const useSendGift = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SendGift, TError, SendGiftVariables, TContext>) =>
    useMutation<SendGift, TError, SendGiftVariables, TContext>(
      'sendGift',
      (variables?: SendGiftVariables) => fetcher<SendGift, SendGiftVariables>(SendGiftDocument, variables)(),
      options
    );
export const FetchPlayerDocument = `
    query fetchPlayer($id: ID!) {
  player(id: $id) {
    id
    username
  }
}
    `;
export const useFetchPlayer = <
      TData = FetchPlayer,
      TError = unknown
    >(
      variables: FetchPlayerVariables,
      options?: UseQueryOptions<FetchPlayer, TError, TData>
    ) =>
    useQuery<FetchPlayer, TError, TData>(
      ['fetchPlayer', variables],
      fetcher<FetchPlayer, FetchPlayerVariables>(FetchPlayerDocument, variables),
      options
    );
export const FetchResourcesDocument = `
    query fetchResources($id: ID!) {
  resources(id: $id) {
    resourceType
    amount
  }
}
    `;
export const useFetchResources = <
      TData = FetchResources,
      TError = unknown
    >(
      variables: FetchResourcesVariables,
      options?: UseQueryOptions<FetchResources, TError, TData>
    ) =>
    useQuery<FetchResources, TError, TData>(
      ['fetchResources', variables],
      fetcher<FetchResources, FetchResourcesVariables>(FetchResourcesDocument, variables),
      options
    );