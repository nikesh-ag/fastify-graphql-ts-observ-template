import fp from "fastify-plugin";
import { PluginOptions, FastifyMetrics } from "fastify-metrics/dist/plugin";

import { metricsConfig } from "../config/metrics-config";
import { CountersObject, createCounters } from "../metrics/counters";
import { GaugesObject, createGauges } from "../metrics/gauges";
import { HistogramsObject, createHistograms } from "../metrics/histograms";
import { SummariesObject, createSummaries } from "../metrics/summaries";

/**
 * This plugins creates the prometheus client for the application
 * It adds metrics to the fastify instance (fastify.metrics)
 * The metrics decorator also has the prom-client (fastify.metrics.client)
 */
export default fp<PluginOptions>(async (fastify, _opts) => {
  const metricsPlugin = require("fastify-metrics");
  fastify.register(metricsPlugin, metricsConfig);

  fastify.metrics;

  fastify.metrics = {
    ...fastify.metrics,
    ...createCounters(fastify),
    ...createGauges(fastify),
    ...createHistograms(fastify),
    ...createSummaries(fastify),
  };
});

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
