import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLError, parse, validate, ValidationRule } from 'graphql';
import schema from './mySchema.js';
import depthLimit from 'graphql-depth-limit';

interface DepthLimitRule extends ValidationRule {
  name: string;
}

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const depthLimitValidationRule = depthLimit(5) as DepthLimitRule;
      const validationErrors = validate(schema, parse(req.body.query), [
        depthLimitValidationRule,
      ]);
      const errors: GraphQLError[] = Array.from(validationErrors);

      if (errors.length > 0) {
        return { errors };
      }

      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma, fastify },
      });
    },
  });
};

export default plugin;
