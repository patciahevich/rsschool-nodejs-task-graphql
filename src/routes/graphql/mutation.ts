import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  MemberTypeIdEnum,
  PostInterface,
  ProfileInterface,
  UserInterface,
} from './interfaces.js';
import { UUIDType } from './types/uuid.js';
import {
  changePost,
  changeProfile,
  changeUser,
  createPost,
  createProfile,
  createUser,
  deletePost,
  deleteProfile,
  deleteUser,
  subscribeTo,
  unSubscribeFrom,
} from './resolvers.js';

const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});
const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
    userId: { type: UUIDType },
  },
});

const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});

export const PostMutation = {
  createPost: {
    type: PostInterface,
    args: { dto: { type: CreatePostInputType } },
    resolve: createPost,
  },
  changePost: {
    type: PostInterface,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangePostInputType },
    },
    resolve: changePost,
  },
  deletePost: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: UUIDType },
    },
    resolve: deletePost,
  },
};

export const UserMutation = {
  createUser: {
    type: UserInterface,
    args: { dto: { type: CreateUserInputType } },
    resolve: createUser,
  },

  changeUser: {
    type: UserInterface,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeUserInputType },
    },
    resolve: changeUser,
  },

  deleteUser: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: UUIDType },
    },
    resolve: deleteUser,
  },
};

export const ProfileMutation = {
  createProfile: {
    type: ProfileInterface,
    args: {
      dto: { type: CreateProfileInputType },
    },
    resolve: createProfile,
  },
  changeProfile: {
    type: ProfileInterface,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeProfileInputType },
    },
    resolve: changeProfile,
  },
  deleteProfile: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: UUIDType },
    },
    resolve: deleteProfile,
  },
};

export const SubscribeMutation = {
  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    resolve: subscribeTo,
  },
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    resolve: unSubscribeFrom,
  },
};
