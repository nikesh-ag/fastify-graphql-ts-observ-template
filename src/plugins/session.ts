import fp from "fastify-plugin";
import FastifySessionPlugin from "@fastify/session";

import { sessionConfig } from "../config/session-config";

export default fp<FastifySessionPlugin.Options>(
  async (fastify, _opts) => {
    const { session, sessionOptions } = sessionConfig(fastify);
    fastify.register(session, sessionOptions);
  },
  {
    name: "sessionPlugin",
    fastify: "3.x",
    dependencies: ["configPlugin", "cookiePlugin"],
    decorators: { fastify: ["config"] },
  }
);

declare module "fastify" {
  export interface Session {
    user_id: string | null;
    other_key: string;
  }
}
