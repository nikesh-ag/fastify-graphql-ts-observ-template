import fp from "fastify-plugin";
import { PluginOptions, FastifyMetrics } from "fastify-metrics/dist/plugin";

import { metricsConfig } from "../config/metrics-config";
import { CountersObject, createCounters } from "../metrics/counters";
import { GaugesObject, createGauges } from "../metrics/gauges";
import { HistogramsObject, createHistograms } from "../metrics/histograms";
import { SummariesObject, createSummaries } from "../metrics/summaries";

export default fp<PluginOptions>(
  async (fastify, _opts) => {
    const metricsPlugin = require("fastify-metrics");
    await fastify.register(metricsPlugin, metricsConfig);

    fastify.metrics = {
      ...fastify.metrics,
      ...createCounters(fastify),
      ...createGauges(fastify),
      ...createHistograms(fastify),
      ...createSummaries(fastify),
    };
  },
  {
    name: "metricsPlugin",
    fastify: "3.x",
    dependencies: [],
  }
);

export type Metrics = FastifyMetrics &
  CountersObject &
  GaugesObject &
  HistogramsObject &
  SummariesObject;

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    metrics: Metrics;
  }
}
