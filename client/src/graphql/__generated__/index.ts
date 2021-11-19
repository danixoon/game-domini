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

export type Gift = {
  __typename?: 'Gift';
  amount: Scalars['Int'];
  authorId: Scalars['ID'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  resourceType: ResourceType;
  targetId: Scalars['ID'];
};

export type GiftFilter = {
  after?: InputMaybe<Scalars['Date']>;
  authorIds?: InputMaybe<Array<Scalars['ID']>>;
  before?: InputMaybe<Scalars['Date']>;
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
  properties: Array<Property>;
  resources: Array<Resource>;
  username: Scalars['String'];
};

export type Property = {
  __typename?: 'Property';
  amount: Scalars['Int'];
  propertyType: PropertyType;
};

export enum PropertyType {
  Agility = 'AGILITY',
  Luck = 'LUCK',
  Stealth = 'STEALTH',
  Strength = 'STRENGTH'
}

export type Query = {
  __typename?: 'Query';
  gifts: Array<Gift>;
  player?: Maybe<Player>;
  players: Array<Player>;
  resources: Array<Resource>;
};


export type QueryGiftsArgs = {
  filter: GiftFilter;
};


export type QueryPlayerArgs = {
  id: Scalars['ID'];
};


export type QueryResourcesArgs = {
  id: Scalars['ID'];
};

export type Resource = {
  __typename?: 'Resource';
  amount: Scalars['Int'];
  playerId: Scalars['Int'];
  resourceType: ResourceType;
};

export enum ResourceType {
  Crystal = 'CRYSTAL',
  Gold = 'GOLD'
}

export type SendGiftPayload = {
  amount: Scalars['Int'];
  authorId: Scalars['ID'];
  resourceType: ResourceType;
  targetId: Scalars['ID'];
};

export type SendGiftVariables = Exact<{
  type: ResourceType;
  amount: Scalars['Int'];
  authorId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type SendGift = { __typename?: 'Mutation', gift?: { __typename?: 'GiftMutation', send: { __typename?: 'Gift', id: string } } | null | undefined };

export type FetchPlayerVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchPlayer = { __typename?: 'Query', player?: { __typename?: 'Player', id: string, username: string } | null | undefined };


export const SendGiftDocument = `
    mutation sendGift($type: ResourceType!, $amount: Int!, $authorId: ID!, $targetId: ID!) {
  gift {
    send(
      payload: {resourceType: $type, amount: $amount, authorId: $authorId, targetId: $targetId}
    ) {
      id
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