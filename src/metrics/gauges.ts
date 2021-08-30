import { FastifyInstance } from "fastify";
import { Gauge } from "prom-client";

export interface GaugesObject {
  gaugesExample: Gauge<string>;
}

/**
 *
 * @param fastify
 * @returns object with all the global gauges
 *
 * Use this function to define the global gauges to be used for
 * Prometheus Client
 */
export const createGauges = (fastify: FastifyInstance) => {
  const gaugeExample = new fastify.metrics.client.Gauge({
    name: "gauge_name",
    help: "gauge_help",
    // aggregator: undefined,
    // collect: undefined,
    // labelNames: undefined,
    // registers: undefined,
  });

  return {
    gaugeExample,
  };
};
