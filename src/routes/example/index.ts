import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return `Hopefully this works on ${process.env.NODE_ENV}`;
  });
};

export default example;
