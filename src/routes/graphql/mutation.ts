import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { PostInterface } from './interfaces.js';
import { UUIDType } from './types/uuid.js';
import { GqlContext } from './resolvers.js';

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const PostMutation = {
  createPost: {
    type: PostInterface,
    args: { dto: { type: PostInputType } },
    resolve: async (parent, args: { dto: Post }, context: GqlContext) => {
      return await context.prisma.post.create({ data: args.dto });
    },
  },
  updatePost: {
    type: PostInterface,
    args: {
      id: { type: UUIDType },
      dto: { type: PostInputType },
    },
    resolve: async (
      parent,
      args: { id: string; dto: Partial<Post> },
      context: GqlContext,
    ) => {
      return await context.prisma.post.update({
        where: { id: args.id },
        data: args.dto,
      });
    },
  },
  deletePost: {
    type: PostInterface,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (parent, args: { id: string }, context: GqlContext) => {
      return await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
