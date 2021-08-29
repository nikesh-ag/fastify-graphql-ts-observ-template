import { FastifyInstance } from "fastify";
import { Histogram } from "prom-client";

export interface HistogramsObject {
  histogramExample: Histogram<string>;
}

/**
 *
 * @param fastify
 * @returns object with all the global histograms
 *
 * Use this function to define the global histograms to be used for
 * Prometheus Client
 */
export const createHistograms = (fastify: FastifyInstance) => {
  const histogramExample = new fastify.metrics.client.Histogram({
    name: "counter_name",
    help: "counter_help",
    aggregator: undefined,
    collect: undefined,
    labelNames: undefined,
    registers: undefined,
    buckets: undefined,
  });

  return {
    histogramExample,
  };
};
