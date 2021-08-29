import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const db = new PrismaClient();
  await db.$connect();

  fastify.decorate("db", db);

  fastify.addHook("onClose", async (fastify) => {
    fastify.log.info("disconnecting Prisma from DB");
    await fastify.db.$disconnect();
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    db: PrismaClient;
  }
}
