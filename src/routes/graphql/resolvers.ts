import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export type GqlContext = { prisma: PrismaClient; fastify: FastifyInstance };

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
