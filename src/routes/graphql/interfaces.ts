import { Prisma, User } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';
import { getUsers, GqlContext } from './resolvers.js';

type ValueOf<T> = T[keyof T];
type PickByValue<T, V extends T[keyof T]> = {
  [K in Exclude<keyof T, ValueOf<{ [P in keyof T]: T[P] extends V ? never : P }>>]: T[K];
};
type KeyOfValue<T, V extends T[keyof T]> = keyof PickByValue<T, V>;
type PickValueByKey<T, K> = K extends keyof T ? T[K] : never;

interface ModelMap {
  User: User;
}
interface SelectMap {
  User: Prisma.UserSelect;
}
interface PayloadMap<S extends string | number | symbol> {
  User: Prisma.UserGetPayload<{ select: { [K in S]: true } }>;
}
type FullModelType<
  M extends ValueOf<ModelMap>,
  N = KeyOfValue<ModelMap, M>,
  S = Required<PickValueByKey<SelectMap, N>>,
> = PickValueByKey<PayloadMap<keyof S>, N>;

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

const OperationInterface = new GraphQLObjectType({
  name: 'Operation',
  fields: {
    model: { type: GraphQLString },
    operation: { type: GraphQLString },
    args: { type: GraphQLString },
  },
});

export const OperationHistoryType = new GraphQLObjectType({
  name: 'OperationHistory',
  fields: {
    operationHistory: {
      type: new GraphQLList(OperationInterface),
    },
  },
});

export const MemberTypeInterface = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: MemberTypeIdEnum,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  },
});

export const ProfileInterface = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: { type: MemberTypeInterface },
  },
});

export const PostInterface = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const UserInterface: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileInterface },
    posts: { type: new GraphQLList(PostInterface) },
    userSubscribedTo: {
      type: new GraphQLList(UserInterface),
      resolve: (parent: FullModelType<User>, _, context: GqlContext) => {
        const ids = parent.userSubscribedTo?.map(({ authorId }) => authorId);

        return getUsers(undefined, { ids }, context);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserInterface),
      resolve: (parent: FullModelType<User>, _, context: GqlContext) => {
        const ids = parent.subscribedToUser?.map(({ subscriberId }) => subscriberId);

        return getUsers(undefined, { ids }, context);
      },
    },
  }),
});
