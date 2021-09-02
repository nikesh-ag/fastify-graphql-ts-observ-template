import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default fp(
  async (fastify, _opts) => {
    await db.$connect();

    fastify.decorate("db", db);

    fastify.addHook("onClose", async (fastify) => {
      fastify.log.info("disconnecting Prisma from DB");
      await fastify.db.$disconnect();
    });
  },
  {
    name: "dbPlugin",
    fastify: "3.x",
    dependencies: [],
  }
);

declare module "fastify" {
  export interface FastifyInstance {
    db: PrismaClient;
  }
}
