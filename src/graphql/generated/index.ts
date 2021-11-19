import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: ObjectID;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
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

export type PropertyType =
  | 'AGILITY'
  | 'LUCK'
  | 'STEALTH'
  | 'STRENGTH';

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

export type ResourceType =
  | 'CRYSTAL'
  | 'GOLD';

export type SendGiftPayload = {
  amount: Scalars['Int'];
  authorId: Scalars['ID'];
  resourceType: ResourceType;
  targetId: Scalars['ID'];
};

import { ObjectID } from 'mongodb';
export type GiftDbObject = {
  amount: number,
  authorId: IdDbObject['_id'],
  createdAt: Date,
  _id: ObjectID,
  resourceType: ResourceType,
  targetId: IdDbObject['_id'],
};

export type PlayerDbObject = {
  _id: ObjectID,
  properties: Array<PropertyDbObject>,
  resources: Array<ResourceDbObject>,
  username: string,
};

export type ResourceDbObject = {
  amount: number,
  playerId: IntDbObject['_id'],
  resourceType: ResourceType,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Gift: ResolverTypeWrapper<Gift>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  GiftFilter: GiftFilter;
  GiftMutation: ResolverTypeWrapper<GiftMutation>;
  IdDbObject: ResolverTypeWrapper<IdDbObject>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  Property: ResolverTypeWrapper<Property>;
  PropertyType: PropertyType;
  Query: ResolverTypeWrapper<{}>;
  Resource: ResolverTypeWrapper<Resource>;
  ResourceType: ResourceType;
  SendGiftPayload: SendGiftPayload;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String'];
  Date: Scalars['Date'];
  Gift: Gift;
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  GiftFilter: GiftFilter;
  GiftMutation: GiftMutation;
  IdDbObject: IdDbObject;
  Mutation: {};
  Player: Player;
  Property: Property;
  Query: {};
  Resource: Resource;
  SendGiftPayload: SendGiftPayload;
  Void: Scalars['Void'];
  Boolean: Scalars['Boolean'];
};

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  discriminatorField: Scalars['String'];
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  embedded?: Maybe<Scalars['Boolean']>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
  discriminatorField?: Maybe<Scalars['String']>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = Backend.GraphQL.GraphQLContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GiftResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Gift'] = ResolversParentTypes['Gift']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  resourceType?: Resolver<ResolversTypes['ResourceType'], ParentType, ContextType>;
  targetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftMutationResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['GiftMutation'] = ResolversParentTypes['GiftMutation']> = {
  send?: Resolver<ResolversTypes['Gift'], ParentType, ContextType, RequireFields<GiftMutationSendArgs, 'payload'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IdDbObjectResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['IdDbObject'] = ResolversParentTypes['IdDbObject']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  gift?: Resolver<Maybe<ResolversTypes['GiftMutation']>, ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  resources?: Resolver<Array<ResolversTypes['Resource']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  propertyType?: Resolver<ResolversTypes['PropertyType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  gifts?: Resolver<Array<ResolversTypes['Gift']>, ParentType, ContextType, RequireFields<QueryGiftsArgs, 'filter'>>;
  player?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryPlayerArgs, 'id'>>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  resources?: Resolver<Array<ResolversTypes['Resource']>, ParentType, ContextType, RequireFields<QueryResourcesArgs, 'id'>>;
};

export type ResourceResolvers<ContextType = Backend.GraphQL.GraphQLContext, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resourceType?: Resolver<ResolversTypes['ResourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = Backend.GraphQL.GraphQLContext> = {
  Date?: GraphQLScalarType;
  Gift?: GiftResolvers<ContextType>;
  GiftMutation?: GiftMutationResolvers<ContextType>;
  IdDbObject?: IdDbObjectResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = Backend.GraphQL.GraphQLContext> = {
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
};
