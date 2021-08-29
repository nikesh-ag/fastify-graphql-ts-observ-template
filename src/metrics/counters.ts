import { FastifyInstance } from "fastify";
import { Counter } from "prom-client";

export interface CountersObject {
  counterExample: Counter<string>;
}

/**
 *
 * @param fastify
 * @returns object with all the global counters
 *
 * Use this function to define the global counters to be used for
 * Prometheus Client
 */
export const createCounters = (fastify: FastifyInstance) => {
  const counterExample = new fastify.metrics.client.Counter({
    name: "counter_name",
    help: "counter_help",
    aggregator: undefined,
    collect: undefined,
    labelNames: undefined,
    registers: undefined,
  });

  return {
    counterExample,
  };
};
