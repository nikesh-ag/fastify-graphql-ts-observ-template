import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { MercuriusOptions } from "mercurius";
import { PrismaClient } from "@prisma/client";

// import { schema } from "../schema";

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
}

export const graphqlServerConfig = (
  fastify: FastifyInstance
): MercuriusOptions => {
  return {
    // String, String[] or schema definition. The graphql schema. The string will be parsed.
    // schema,

    // string. Change default graphql /graphql route to another one.
    path: "/graphql",

    // Object. The graphql resolvers.
    // resolvers: undefined,

    /**
     * Object.
     * @see https://mercurius.dev/#/docs/api/options?id=appgraphqlextendschemaschema-appgraphqldefineresolversresolvers-and-appgraphqldefineloadersloaders
     * for more details.
     */
    // loaders: undefined,

    // Array of schema-transformation functions. Accept a schema as an argument and return a schema.
    // schemaTransforms: undefined,

    // Integer. The minimum number of execution a query needs to be executed before being jit'ed.
    // jit: undefined

    // boolean. Serves the Default: true. A graphql endpoint is exposed at /graphql.
    // routes: true,

    /**
     * Function.
     * Result of function is passed to resolvers as a custom GraphQL context.
     * The function receives the request and reply as parameters.
     * It is only called when routes options is true
     */
    context: (request: FastifyRequest, reply: FastifyReply): Context => {
      return {
        prisma: fastify.db,
        request,
        reply,
      };
    },

    /**
     * boolean | string.
     * Serve GraphiQL on /graphiql if true or 'graphiql'.
     * Leave empty or false to disable.
     * Only applies if onlyPersisted option is not true
     * If routes is false, this option does not have effects.
     */
    graphiql: process.env.NODE_ENV === "development",

    // String. Change the route prefix of the graphql endpoint if enabled.
    // prefix: undefined,

    // Boolean. Add the empty Mutation definition if schema is not defined (Default: false).
    // defineMutation: false,

    /**
     * Function  or boolean.
     * Change the default error handler (Default: true).
     * Note: If a custom error handler is defined, it should return the standardized
     * response format according to GraphQL spec.
     */
    // errorHandler: true,

    /**
     * Function.
     * Change the default error formatter.
     * Allows the status code of the response to be set, and a GraphQL response
     * for the error to be defined.
     * This can be used to format errors for batched queries,
     * which return a successful response overall but individual errors,
     * or to obfuscate or format internal errors.
     * The first argument is the error object,
     * while the second one might be the context if it is available.
     */
    // errorFormatter: undefined,

    /**
     * Integer.
     * The maximum depth allowed for a single query.
     * Note: GraphiQL IDE sends an introspection query when it starts up.
     * This query has a depth of 7 so when the queryDepth value is smaller than 7
     * this query will fail with a Bad Request error
     */
    // queryDepth: undefined,

    /**
     * Function or Function[].
     * Optional additional validation rules that the queries must satisfy
     * in addition to those defined by the GraphQL specification.
     * When using Function, arguments include additional data from graphql request
     * and the return value must be validation rules Function[].
     */
    // validationRules: undefined,

    /**
     * Boolean | Object.
     * Enable subscriptions.
     * It uses mqemitter when it is true and exposes the pubsub interface to app.graphql.pubsub.
     * To use a custom emitter set the value to an object containing the emitter.
     */

    // subscription: {
    // Custom Emitter
    // emitter: undefined,

    /**
     * Custom pubsub, @see https://mercurius.dev/#/docs/subscriptions?id=subscriptions-with-custom-pubsub
     * Note that when passing both emitter and pubsub options, emitter will be ignored.
     */
    // pubsub: undefined,

    // Function A function which can be used to validate incoming connections.
    // verifyClient: undefined,

    /**
     * Function.
     * Result of function is passed to subscription resolvers as a custom GraphQL context.
     * The function receives the connection and request as parameters.
     */
    // context: undefined,

    /**
     * Function.
     * A function which can be used to validate the connection_init payload.
     * If defined it should return a truthy value to authorize the connection.
     * If it returns an object the subscription context will be extended with the returned object.
     */
    // onConnect: undefined,

    /**
     * Function.
     * A function which is called with the subscription context of the connection
     * after the connection gets disconnected.
     */
    // onDisconnect: undefined,
    // }

    /**
     * Boolean.
     * Enable federation metadata support so the service can be deployed
     * behind an Apollo Gateway
     */
    // federationMetadata: undefined,

    // Object. Run the GraphQL server in gateway mode.
    // gateway: {
    // Service[] An array of GraphQL services that are part of the gateway
    //   services: [
    // {
    // A unique name for the service. Required.
    //   name: undefined,

    // The url of the service endpoint. Required
    //   url: undefined,

    /**  Boolean Marks service as mandatory.
     * If any of the mandatory services are unavailable,
     * gateway will exit with an error. (Default: false)
     */
    //   mandatory: false,

    /**
     * Function.
     * A function that gets the original headers as a parameter
     * and returns an object containing values that should be added to the headers
     */
    //   rewriteHeaders: undefined,

    /**
     * Function or Object.
     * An object or a function that returns the headers sent to the service
     * for the initial _service SDL query.
     */
    //   initHeaders: undefined,

    // The number of clients to create. (Default: 10)
    //   connections: 10,

    // The timeout after which a request will time out, in milliseconds. (Default: 30e3 - 30 seconds)
    //   bodyTimeout: undefined,

    /**
     * The amount of time the parser will wait to receive the complete HTTP headers,
     * in milliseconds. (Default: 30e3 - 30 seconds)
     */
    //   headersTimeout: undefined,

    // The maximum allowed keepAliveTimeout. (Default: 5e3 - 5 seconds)
    //   keepAliveMaxTimeout: undefined,

    // The maximum length of request headers in bytes. (Default: 16384 - 16KiB)
    //   maxHeaderSize: 16384,

    // The url of the websocket endpoint
    //   wsUrl: undefined,

    // Function or Object
    //   wsConnectionParams: {
    /**
     * Function or Object.
     * An object or a function that returns the connection_init payload sent to the service.
     */
    //   connectionInitPayload: undefined,

    // Boolean Enable reconnect on connection close (Default: false)
    //   reconnect: false,

    // Number Defines the maximum reconnect attempts if reconnect is enabled (Default: Infinity)
    //   maxReconnectAttempts: undefined,

    // Function A function called after a connection_ack message is received.
    //   connectionCallback: undefined,

    /**
     * Function.
     * A function called after a connection_error message is received,
     * the first argument contains the message payload.
     */
    //   failedConnectionCallback: undefined,

    // Function A function called if reconnect is enabled and maxReconnectAttempts is reached.
    //   failedReconnectCallback: undefined,

    /**
     * Function.
     * A function that gets the original connection_init payload
     * along with the context as a parameter
     * and returns an object that replaces the original connection_init payload
     * before forwarding it to the federated service
     */
    //   rewriteConnectionInitPayload: undefined,
    //   }
    // },
    //   ],
    // },

    /**
     * Boolean.
     * Flag to control whether to allow batched queries.
     * When true, the server supports recieving an array of queries and returns an array of results.
     */
    // allowBatchedQueries: false,

    /**
     * A hash/query map to resolve the full query text using it's unique hash.
     * Overrides persistedQueryProvider.
     */
    // persistedQueries: undefined,

    /**
     * Boolean.
     * Flag to control whether to allow graphql queries other than persisted.
     * When true, it'll make the server reject any queries that are not present
     * in the persistedQueries option above.
     * It will also disable any ide available (graphiql).
     * Requires persistedQueries to be set, and overrides persistedQueryProvider.
     */
    // onlyPersisted: false,

    // Object
    // persistedQueryProvider: {
    /**
     * (request: object) => boolean
     * Return true if a given request matches the desired persisted query format.
     */
    // isPersistedQuery: undefined,

    /**
     * (request: object) => string
     * Return the hash from a given request, or falsy if this request format is not supported.
     */
    // getHash: undefined,

    /**
     * async (hash: string) => string
     * Return the query for a given hash.
     */
    // getQueryFromHash: undefined,

    /**
     * Optional
     * (query: string) => string
     * Return the hash for a given query string.
     * Do not provide if you want to skip saving new queries.
     */
    // getHashForQuery: undefined,

    /**
     * Optional
     * async (hash: string, query: string) => void
     * Save a query, given its hash.
     */
    // saveQuery: undefined,

    /**
     * string
     * An error message to return when getQueryFromHash returns no result.
     * Defaults to Bad Request
     */
    // notFoundError: undefined,

    /**
     * string
     * An error message to return when a query matches isPersistedQuery,
     * but returns no valid hash from getHash.
     * Defaults to Bad Request
     */
    // notSupportedError: undefined,
    // }
  };
};
