import fp from "fastify-plugin";
import mercurius, { MercuriusOptions } from "mercurius";

import { graphqlServerConfig } from "../config/graphql-server-config";

export default fp<MercuriusOptions>(
  async (fastify, _opts) => {
    fastify.register(mercurius, graphqlServerConfig(fastify));
  },
  {
    name: "graphqlPlugin",
    fastify: "3.x",
    dependencies: ["metricsPlugin", "dbPlugin"],
  }
);
