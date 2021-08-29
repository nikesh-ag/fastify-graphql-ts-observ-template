import fp from "fastify-plugin";
import mercurius, { MercuriusOptions } from "mercurius";

import { graphqlServerConfig } from "../config/graphql-server-config";

/**
 * This plugins creates the graphql server for the application
 */
export default fp<MercuriusOptions>(async (fastify, opts) => {
  fastify.register(mercurius, graphqlServerConfig(fastify));
});
