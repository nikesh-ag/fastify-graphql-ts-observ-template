import { PluginOptions } from "fastify-metrics/dist/plugin";

export const metricsConfig: PluginOptions = {
  /**
   * Boolean
   * Enables collection of default prom-client metrics.
   */
  //   enableDefaultMetrics: true,

  /**
   * Boolean
   * Enables collection of fastify route metrics.
   */
  // enableRouteMetrics: true,

  /**
   * String
   * Change name which you'll use to access prometheus client instance in fastify.
   */
  // pluginName: 'metrics',

  /**
   * Number
   * Default metrics collection interval in ms.
   */
  // interval: 5000,

  /**
   * Object
   * Custom prom-client metrics registry.
   */
  // register: undefined,

  /**
   * String
   * Custom default metrics prefix.
   */
  // prefix: "",

  /**
   * String
   * If set, fastify route will be added to expose metrics. If not set you may manually add it afterwards.
   */
  endpoint: "/metrics",

  /**
   * Object
   * Allows override default metrics config.
   * Default values given below
   */
  // metrics: {
  //   histogram: {
  //     name: "http_request_duration_seconds",
  //     help: "request duration in seconds",
  //     labelNames: ["status_code", "method", "route"],
  //     buckets: [0.05, 0.1, 0.5, 1, 3, 5, 10],
  //   },
  //   summary: {
  //     name: "http_request_summary_seconds",
  //     help: "request duration in seconds summary",
  //     labelNames: ["status_code", "method", "route"],
  //     percentiles: [0.5, 0.9, 0.95, 0.99],
  //   },
  // },

  /**
   * String, RegExp, String[]
   * Skip metrics collection for blacklisted routes
   */
  // blacklist: undefined,

  /**
   * Boolean
   * Groups status codes (e.g. 2XX) if true
   */
  // groupStatusCodes: false,

  /**
   * String
   * If set, group any urls not matching a valid fastify
   * route together rather than report individually.
   */
  // invalidRouteGroup: undefined,
};
