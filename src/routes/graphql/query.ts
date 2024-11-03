import { GraphQLList } from 'graphql';
import {
  MemberTypeIdEnum,
  MemberTypeInterface,
  OperationHistoryType,
  PostInterface,
  ProfileInterface,
  UserInterface,
} from './interfaces.js';
import { UUIDType } from './types/uuid.js';
import {
  getUser,
  getUsers,
  getStats,
  getMember,
  getMembers,
  getPost,
  getPosts,
  getProfile,
  getProfiles,
} from './resolvers.js';

export const StatQuery = {
  stats: {
    operationName: 'statsQuery',
    type: OperationHistoryType,
    resolve: getStats,
  },
};
export const MemberQuery = {
  memberType: {
    type: MemberTypeInterface,
    description: 'A single member',
    args: {
      id: { type: MemberTypeIdEnum },
    },
    resolve: getMember,
  },

  memberTypes: {
    type: new GraphQLList(MemberTypeInterface),
    description: 'List of all members',
    resolve: getMembers,
  },
};

export const PostQuery = {
  post: {
    type: PostInterface,
    description: 'A single post',
    args: {
      id: { type: UUIDType },
    },
    resolve: getPost,
  },
  posts: {
    type: new GraphQLList(PostInterface),
    description: 'All posts',
    resolve: getPosts,
  },
};

export const UserQuery = {
  user: {
    type: UserInterface,
    description: 'A single user',
    args: {
      id: { type: UUIDType },
    },
    resolve: getUser,
  },
  users: {
    type: new GraphQLList(UserInterface),
    description: 'All users',
    resolve: getUsers,
  },
};
export const ProfileQuery = {
  profile: {
    type: ProfileInterface,
    description: 'A single profile',
    args: {
      id: { type: UUIDType },
    },
    resolve: getProfile,
  },
  profiles: {
    type: new GraphQLList(ProfileInterface),
    description: 'All profiles',
    resolve: getProfiles,
  },
};
