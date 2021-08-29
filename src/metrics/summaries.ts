import { FastifyInstance } from "fastify";
import { Summary } from "prom-client";

export interface SummariesObject {
  summaryExample: Summary<string>;
}

/**
 *
 * @param fastify
 * @returns object with all the global summaries
 *
 * Use this function to define the global summaries to be used for
 * Prometheus Client
 */
export const createSummaries = (fastify: FastifyInstance) => {
  const summaryExample = new fastify.metrics.client.Summary({
    name: "counter_name",
    help: "counter_help",
    aggregator: undefined,
    collect: undefined,
    labelNames: undefined,
    registers: undefined,
    ageBuckets: undefined,
    compressCount: undefined,
    maxAgeSeconds: undefined,
    percentiles: undefined,
  });

  return {
    summaryExample,
  };
};
