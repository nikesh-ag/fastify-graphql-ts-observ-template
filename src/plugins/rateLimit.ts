import fp from "fastify-plugin";
import { RateLimitOptions } from "fastify-rate-limit";

const rateLimitOptions: RateLimitOptions = {
  //   allowList: [],
  //   ban: undefined,
  //   cache: 5000,
  //   enableDraftSpec: false,
  //   errorResponseBuilder: undefined,
  //   keyGenerator: undefined,
  //   max: 1000,
  //   skipOnError: false,
  //   store: undefined,
  //   timeWindow: 60000,
};

export default fp<RateLimitOptions>(async (fastify, _opts) => {
  fastify.register(require("fastify-rate-limit"), rateLimitOptions);
});
