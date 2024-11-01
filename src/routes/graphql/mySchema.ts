import { PrismaClient } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

type GqlContext = { prisma: PrismaClient };

/// member type
const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

const MemberTypeInterface = new GraphQLObjectType({
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

const UserInterface = new GraphQLInterfaceType({
  name: 'Account',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
  },
});

const ProfileInterface = new GraphQLInterfaceType({
  name: 'Member',
  fields: {
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});

const PostInterface = new GraphQLInterfaceType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLID },
  },
});

const MemberQuery = {
  member: {
    type: MemberTypeInterface,
    description: 'A single member',
    args: {
      id: { type: MemberTypeIdEnum },
    },
    resolve: async (parent, args: { id: string }, context: GqlContext) => {
      // return 'hello wdwdw';
      return await context.prisma.memberType.findUnique({
        where: { id: args.id },
      });
    },
  },

  members: {
    type: new GraphQLList(MemberTypeInterface),
    description: 'List of all members',
    resolve: async (parent, _args, context: GqlContext) => {
      return await context.prisma.memberType.findMany();
    },
  },
};
const PostQuery = {
  post: {
    type: PostInterface,
    description: 'A single post',
    args: {
      postId: { type: GraphQLString },
    },
    resolve: () => {
      return 'Post';
    },
  },
  posts: {
    type: new GraphQLList(PostInterface),
    description: 'All posts',
    resolve: () => {
      return 'All posts';
    },
  },
};

const UserQuery = {
  user: {
    type: UserInterface,
    description: 'A single user',
    args: {
      userId: { type: GraphQLString },
    },
    resolve: (parent, args: { userId: string }) => {
      return `User with id ${args.userId}`;
    },
  },
  users: {
    type: new GraphQLList(UserInterface),
    description: 'All users',
    resolve: () => 'All users',
  },
};

const ProfileQuery = {
  profile: {
    type: ProfileInterface,
    description: 'A single profile',
    args: {
      profileId: { type: GraphQLString },
    },
    resolve: (parent, args: { profileId: string }) => {
      return `User with id ${args.profileId}`;
    },
  },
  profiles: {
    type: new GraphQLList(ProfileInterface),
    description: 'All profiles',
    resolve: () => 'All profiles',
  },
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
      ...MemberQuery,
      ...PostQuery,
      ...UserQuery,
      ...ProfileQuery,
    },
  }),
});

//stats
// const OperationInterface = new GraphQLInterfaceType({
//   name: 'Operation',
//   fields: {
//     model: { type: GraphQLString },
//     operation: { type: GraphQLString },
//     args: { type: GraphQLString },
//   },
// });

// const OperationHistoryType = new GraphQLInterfaceType({
//   name: 'OperationHistory',
//   fields: {
//     operationHistory: {
//       type: new GraphQLList(OperationInterface),
//     },
//   },
// });
