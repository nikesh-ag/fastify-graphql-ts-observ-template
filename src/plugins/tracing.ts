import fp from "fastify-plugin";
import openTelemetryPlugin, {
  OpenTelemetryPluginOptions,
} from "@autotelic/fastify-opentelemetry";

export default fp<OpenTelemetryPluginOptions>(async (fastify, _opts) => {
  fastify.register(openTelemetryPlugin, {
    wrapRoutes: true,
    formatSpanName: (request) => `${request.url} - ${request.method}`,
  });
});
