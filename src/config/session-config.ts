import { FastifyInstance } from "fastify";
import Redis from "ioredis";
import { RedisStore } from "connect-redis";
import FastifySessionPlugin from "@fastify/session";

interface SessionConfig {
  session: any;
  sessionOptions: FastifySessionPlugin.Options;
}

export const sessionConfig = (fastify: FastifyInstance): SessionConfig => {
  const session = require("@fastify/session");
  const redisConnect = require("connect-redis");
  const RedisStore: RedisStore = redisConnect(session);

  /**
   * @see https://github.com/luin/ioredis/blob/master/API.md#new_Redis
   * for all configuration options available
   */
  const redis = new Redis({
    host: fastify.config.REDIS_HOST,
    port: +fastify.config.REDIS_PORT,
    username: fastify.config.REDIS_USERNAME,
    password: fastify.config.REDIS_PASSWORD,
  });

  const sessionOptions: FastifySessionPlugin.Options = {
    /**
     * The secret used to sign the cookie.
     * Must be an array of strings or a string with a length of 32 or greater.
     */
    secret:
      fastify.config.SESSION_SECRET || "alongstringtosignthesessionplugin",

    // The name of the session cookie. Defaults to sessionId.
    cookieName: "sessionId",

    // The options object is used to generate the Set-Cookie header of the session cookie.
    cookie: {
      // The Path attribute. Defaults to / (the root path).
      path: "/",

      /**
       * A number in milliseconds that specifies the Expires attribute by adding the
       * specified milliseconds to the current date.
       * If both expires and maxAge are set, then expires is used.
       */
      maxAge: undefined,

      /**
       * The expiration date used for the Expires attribute.
       * If both expires and maxAge are set, then expires is used.
       */
      expires: undefined,

      // The boolean value of the HttpOnly attribute. Defaults to true.
      httpOnly: true,

      /**
       * The boolean value of the Secure attribute.
       * Set this option to false when communicating over an unencrypted (HTTP) connection.
       * Value can be set to auto;
       * in this case, the Secure attribute will be set to false for an HTTP request.
       * In the case of HTTPS, it will be set to true. Defaults to true.
       */
      secure: true,

      /**
       * The boolean or string of the SameSite attribute.
       * Using Secure mode with auto attribute will change the behavior
       * of the SameSite attribute in http mode.
       * The SameSite attribute will automatically be set to
       * Lax with an http request.
       * @see https://www.chromium.org/updates/same-site
       */
      sameSite: true,

      // The Domain attribute.
      domain: undefined,
    },

    // session store
    store: new RedisStore({
      client: redis,
    }),

    /**
     * Save sessions to the store, even when they are new and not modified
     * defaults to true.
     * Setting this to false can save storage space and comply with the EU cookie law.
     */
    saveUninitialized: true,
  };

  return {
    session,
    sessionOptions,
  };
};
