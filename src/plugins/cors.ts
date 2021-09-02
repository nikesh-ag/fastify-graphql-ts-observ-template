import fp from "fastify-plugin";
import { FastifyCorsOptions } from "fastify-cors";

const corsOptions: FastifyCorsOptions = {
  // origin: true
  // methods: undefined,
  // allowedHeaders: undefined,
  // exposedHeaders: undefined,
  // credentials: false,
  // maxAge: undefined,
  // preflightContinue: false,
  // optionsSuccessStatus: undefined,
  // preflight: true,
  // strictPreflight: true,
  // hideOptionsRoute: true,
};

export default fp<FastifyCorsOptions>(
  async (fastify, _opts) => {
    fastify.register(require("fastify-cors"), corsOptions);
  },
  {
    name: "corsPlugin",
    fastify: "3.x",
    dependencies: [],
  }
);
