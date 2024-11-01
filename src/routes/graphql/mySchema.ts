import { PrismaClient } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
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

const UserInterface = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

const ProfileInterface = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});

const PostInterface = new GraphQLObjectType({
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
    resolve: async (parent, args: { postId: string }, context: GqlContext) => {
      return context.prisma.post.findUnique({
        where: { id: args.postId },
      });
    },
  },
  posts: {
    type: new GraphQLList(PostInterface),
    description: 'All posts',
    resolve: (parent, _args, context: GqlContext) => {
      return context.prisma.post.findMany();
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
    resolve: async (parent, args: { userId: string }, context: GqlContext) => {
      return context.prisma.user.findUnique({
        where: { id: args.userId },
      });
    },
  },
  users: {
    type: new GraphQLList(UserInterface),
    description: 'All users',
    resolve: (parent, args, context: GqlContext) => {
      return context.prisma.user.findMany();
    },
  },
};

const ProfileQuery = {
  profile: {
    type: ProfileInterface,
    description: 'A single profile',
    args: {
      profileId: { type: GraphQLString },
    },
    resolve: (parent, args: { profileId: string }, context: GqlContext) => {
      return context.prisma.profile.findUnique({
        where: { id: args.profileId },
      });
    },
  },
  profiles: {
    type: new GraphQLList(ProfileInterface),
    description: 'All profiles',
    resolve: (parent, args, context: GqlContext) => {
      return context.prisma.profile.findMany();
    },
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
