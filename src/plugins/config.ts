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

export const loadConfig: () => void = () => {
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
};

const configPlugin: FastifyPluginAsync = fp(async (_fastify, _opts) => {
  loadConfig();
});

export default configPlugin;
