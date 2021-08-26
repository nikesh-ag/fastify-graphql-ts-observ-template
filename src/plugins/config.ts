import path from "path";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import envSchema from "env-schema";
import S from "fluent-json-schema";

interface Env {
  NODE_ENV: string;
}

const schema = S.object().prop(
  "NODE_ENV",
  S.string().enum(["development", "production", "testing"]).required()
);

const loadConfig: FastifyPluginAsync = fp(async (fastify, opts) => {
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
});

export default loadConfig;
