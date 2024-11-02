import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { PostMutation } from './mutation.js';
import { StatQuery, MemberQuery, PostQuery, UserQuery, ProfileQuery } from './query.js';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
      ...StatQuery,
      ...MemberQuery,
      ...PostQuery,
      ...UserQuery,
      ...ProfileQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: {
      ...PostMutation,
    },
  }),
});
