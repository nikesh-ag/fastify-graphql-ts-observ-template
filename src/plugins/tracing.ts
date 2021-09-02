import fp from "fastify-plugin";
import openTelemetryPlugin, {
  OpenTelemetryPluginOptions,
} from "@autotelic/fastify-opentelemetry";

import { createSdk } from "../config/tracing-config";

export default fp<OpenTelemetryPluginOptions>(
  async (fastify, _opts) => {
    createSdk(fastify);

    fastify.register(openTelemetryPlugin, {
      wrapRoutes: true,
      formatSpanName: (request) => `${request.url} - ${request.method}`,
    });
  },
  {
    name: "tracingPlugin",
    fastify: "3.x",
    dependencies: [],
    decorators: { fastify: ["config"] },
  }
);
