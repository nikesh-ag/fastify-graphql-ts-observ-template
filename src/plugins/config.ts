import path from "path";
import fp from "fastify-plugin";
import envSchema from "env-schema";
import S from "fluent-json-schema";

interface Env {
  NODE_ENV: string;
  SERVICE_NAME: string;
  SERVICE_VERSION: string;
  ZIPKIN_EXPORTER: string;
  ZIPKIN_URL: string;
  CONSOLE_EXPORTER: string;
  COOKIE_SECRET: string;
  SESSION_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
}

const schema = S.object()
  .prop(
    "NODE_ENV",
    S.string().enum(["development", "production", "testing"]).required()
  )
  .prop("SERVICE_NAME", S.string().required())
  .prop("SERVICE_VERSION", S.string().required())
  .prop("ZIPKIN_EXPORTER", S.string().required())
  .prop("ZIPKIN_URL", S.string())
  .prop("CONSOLE_EXPORTER", S.string())
  .prop("COOKIE_SECRET", S.string().required().minLength(32))
  .prop("SESSION_SECRET", S.string().required().minLength(32))
  .prop("REDIS_HOST", S.string().required())
  .prop("REDIS_PORT", S.string().required())
  .prop("REDIS_USERNAME", S.string().required())
  .prop("REDIS_PASSWORD", S.string().required());

export const loadConfig: () => Env = () => {
  const result = require("dotenv").config({
    path: path.join(
      __dirname,
      `../../${process.env.NODE_ENV ?? "development"}.env`
    ),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  envSchema<Env>({
    data: result.parsed,
    schema,
  });

  return result.parsed as Env;
};

export default fp(
  async (fastify, _opts) => {
    const config = loadConfig();
    fastify.decorate("config", config);
  },
  {
    name: "configPlugin",
    fastify: "3.x",
    dependencies: [],
  }
);

declare module "fastify" {
  export interface FastifyInstance {
    config: Env;
  }
}
