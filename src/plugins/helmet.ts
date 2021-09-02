import fp from "fastify-plugin";
import { fastifyHelmet } from "fastify-helmet";

const helmetOptions = {
  // contentSecurityPolicy: true,
  // crossOriginEmbedderPolicy: false,
  // crossOriginOpenerPolicy: false,
  // crossOriginResourcePolicy: false,
  // dnsPrefetchControl: true,
  // enableCSPNonces: undefined,
  // expectCt: true,
  // frameguard: true,
  // hidePoweredBy: true,
  // hsts: true,
  // ieNoOpen: true,
  // originAgentCluster: false,
  // noSniff: true,
  // permittedCrossDomainPolicies: true,
  // referrerPolicy: true,
  // xssFilter: true
};

export default fp(
  async (fastify, _opts) => {
    fastify.register(fastifyHelmet, helmetOptions);
  },
  {
    name: "helmetPlugin",
    fastify: "3.x",
    dependencies: [],
  }
);
