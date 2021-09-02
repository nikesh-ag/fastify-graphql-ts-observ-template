import fp from "fastify-plugin";
import { fastifyCookie, FastifyCookieOptions } from "fastify-cookie";

export default fp<FastifyCookieOptions>(
  async (fastify, _opts) => {
    const cookieOptions: FastifyCookieOptions = {
      secret: fastify.config.COOKIE_SECRET,
    };

    await fastify.register(fastifyCookie, cookieOptions);
  },
  {
    name: "cookiePlugin",
    fastify: "3.x",
    dependencies: ["configPlugin"],
    decorators: { fastify: ["config"] },
  }
);
