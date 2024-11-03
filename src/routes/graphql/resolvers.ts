import { Post, PrismaClient, Profile, User } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export type GqlContext = { prisma: PrismaClient; fastify: FastifyInstance };

//// queries

export const getStats = (parent, args, context: GqlContext) => {
  return context.fastify.prismaStats;
};

export const getMember = (parent, args: { id: string }, context: GqlContext) => {
  return context.prisma.memberType.findUnique({
    where: { id: args.id },
  });
};

export const getMembers = (parent, _args, context: GqlContext) => {
  return context.prisma.memberType.findMany();
};

export const getPost = (parent, args: { id: string }, context: GqlContext) => {
  return context.prisma.post.findUnique({
    where: { id: args.id },
  });
};

export const getPosts = (parent: { id: string }, _args, context: GqlContext) => {
  return context.prisma.post.findMany();
};

export const getUser = (_, args: { id: string }, context: GqlContext) => {
  return context.prisma.user.findUnique({
    where: { id: args.id },
    include: {
      posts: true,
      profile: {
        include: {
          memberType: true,
        },
      },
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
};

export const getUsers = (_, args: { ids?: string[] }, context: GqlContext) => {
  return context.prisma.user.findMany({
    where: { id: { in: args.ids } },
    include: {
      posts: true,
      profile: {
        include: {
          memberType: true,
        },
      },
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
};

export const getProfile = (parent, args: { id: string }, context: GqlContext) => {
  return context.prisma.profile.findUnique({
    where: { id: args.id },
  });
};

export const getProfiles = (parent, args, context: GqlContext) => {
  return context.prisma.profile.findMany();
};

//// mutations

export const createPost = (parent, args: { dto: Post }, context: GqlContext) => {
  return context.prisma.post.create({ data: args.dto });
};

export const changePost = (
  parent,
  args: { id: string; dto: Partial<Post> },
  context: GqlContext,
) => {
  return context.prisma.post.update({
    where: { id: args.id },
    data: args.dto,
  });
};

export const deletePost = async (parent, args: { id: string }, context: GqlContext) => {
  try {
    await context.prisma.post.delete({
      where: {
        id: args.id,
      },
    });
    return `Post with ID ${args.id} was successfully deleted.`;
  } catch {
    throw new Error(`Error deleting post with id`);
  }
};

export const createUser = (parent, args: { dto: User }, context: GqlContext) => {
  return context.prisma.user.create({
    data: args.dto,
    include: {
      posts: true,
      profile: {
        include: {
          memberType: true,
        },
      },
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
};

export const changeUser = (
  parent,
  args: { id: string; dto: User },
  context: GqlContext,
) => {
  return context.prisma.user.update({
    where: { id: args.id },
    data: args.dto,
    include: {
      posts: true,
      profile: {
        include: {
          memberType: true,
        },
      },
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
};

export const deleteUser = async (parent, args: { id: string }, context: GqlContext) => {
  try {
    await context.prisma.user.delete({
      where: { id: args.id },
    });
    return `User with id: ${args.id} was successfully deleted.`;
  } catch {
    throw new Error(`Error deleting user with id: ${args.id}`);
  }
};

export const createProfile = (parent, args: { dto: Profile }, context: GqlContext) => {
  return context.prisma.profile.create({
    data: args.dto,
  });
};

export const changeProfile = (
  parent,
  args: { id: string; dto: Profile },
  context: GqlContext,
) => {
  return context.prisma.profile.update({
    where: { id: args.id },
    data: args.dto,
  });
};

export const deleteProfile = async (
  parent,
  args: { id: string },
  context: GqlContext,
) => {
  try {
    await context.prisma.profile.delete({
      where: { id: args.id },
    });
    return `Profile with id: ${args.id} was successfully deleted.`;
  } catch {
    throw new Error(`Error deleting profile with id: ${args.id}`);
  }
};
export const subscribeTo = async (
  parent,
  args: { userId: string; authorId: string },
  context: GqlContext,
) => {
  try {
    await context.prisma.subscribersOnAuthors.create({
      data: { authorId: args.authorId, subscriberId: args.userId },
    });
    return `User with id" ${args.userId} successfully subscribed to the user with id: ${args.authorId}`;
  } catch {
    throw new Error(`Error subscribing to user with id: ${args.authorId}`);
  }
};

export const unSubscribeFrom = async (
  parent,
  args: { userId: string; authorId: string },
  context: GqlContext,
) => {
  try {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          authorId: args.authorId,
          subscriberId: args.userId,
        },
      },
    });
    return `User with id" ${args.userId} successfully unsubscribed from the user with id: ${args.authorId}`;
  } catch {
    throw new Error(`Error unsubscribing from user with id: ${args.authorId}`);
  }
};
