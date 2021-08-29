# Initialize Project

Use fastify-cli to generate the project

```
fastify generate <> --lang=ts
```

Remove the packages `tap @types/tap cross-env`

# Testing

Add Jest for Testing

```
npm i -D jest @types/jest ts-jest
npx jest --init
npx ts-jest config:init
```

# Setup Env Vars

Env variable handling

```
npm i env-schema fluent-json-schema
```

Add config.ts file in src/plugins

# DB (Prisma)

```
npm i -D prisma
npx prisma init
```

Add the schema to `schema.prisma` in prisma folder
Run `npx prisma generate`
Create the db connection plugin `db.ts` in src/plugins

TODO: Setup a DB Server and connect it to Prisma in the `prisma/schema.prisma` file

# Graphql Server

```
npm i graphql mercurius mercurius-auth nexus
```

Create the mercurius server options object in `config/graphql-server-config`
Create the schema in the `src/schema` folder and add it to the server config above
Create the graphql server using mercurius in `graphql-server.ts` in src/plugins
Create the src/graphql folder to define the schema and resolvers

# Metrics (Prometheus)

```
npm i fastify-metrics
```

Create the prometheus client options object in `config/metrics-config`
Create the metrics plugin in `metrics.ts` in src/plugins
Create the src/metrics folder to define the global metrics
Create the global metrics in the `counters.ts`, `gauges.ts`, `histograms.ts` and `summaries.ts` files
Add the metrics object to the graphql server context in `config/graphql-server-config`

TODO: Setup a Prometheus Server and connect it to the client

# Traces (OpenTelemetry)

```
npm i @autotelic/fastify-opentelemetry

```

Install the following openTelemetry libraries

- [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification)
- [API Reference Modules](https://open-telemetry.github.io/opentelemetry-js/modules.html)
- [API Reference JS](https://open-telemetry.github.io/opentelemetry-js-api/)

Main

- [@opentelemetry/api]()
- [@opentelemetry/core](https://www.npmjs.com/package/@opentelemetry/core)
- [@opentelemetry/semantic-conventions](https://www.npmjs.com/package/@opentelemetry/semantic-conventions)
- [@opentelemetry/resources](https://www.npmjs.com/package/@opentelemetry/resources)

SDK

- [@opentelemetry/sdk-trace-base](https://www.npmjs.com/package/@opentelemetry/sdk-trace-base)
- [@opentelemetry/sdk-trace-node](https://www.npmjs.com/package/@opentelemetry/sdk-trace-node)

Auto Instrumentation

- [@opentelemetry/instrumentation](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-instrumentation) use registerInstrumentations()
- [@opentelemetry/instrumentation-http](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-instrumentation-http)
- [@opentelemetry/instrumentation-graphql](https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql)
- @opentelemetry/instrumentation-ioredis
- @opentelemetry/instrumentation-redis

Exporter

- [@opentelemetry/exporter-zipkin](https://www.npmjs.com/package/@opentelemetry/exporter-zipkin)

Create the openTelemetry SDK provider in `config/tracing-config`
Create the tracing plugin in `tracing.ts` in src/plugins
