import fp from "fastify-plugin";
import { FastifyCsrfOptions } from "fastify-csrf";

const csrfOptions: FastifyCsrfOptions = {
  // The name of the cookie where the CSRF secret will be stored, default _csrf
  cookieKey: "_csrf",

  // The key where to store the CSRF secret in the session.
  //   sessionKey: "_csrf",

  //   The session plugin that you are using (if applicable).
  //   sessionPlugin: undefined,

  // The cookie serialization options. See fastify-cookie.
  cookieOpts: {
    signed: true,
  },

  // A sync function to get the CSRF secret from the request.
  //   getToken: undefined,
};

export default fp<FastifyCsrfOptions>(async (fastify, _opts) => {
  fastify.register(require("fastify-csrf"), csrfOptions);

  // protect the routes or entire plugins
  fastify.addHook("onRequest", fastify.csrfProtection);
});
