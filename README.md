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
npm i graphql mercurius mercurius-auth
```

Create the mercurius server options object in `config/graphql-server-config`
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

TODO: Setup a Prometheus Server and connect it to the client

# Traces (OpenTelemetry)

```
npm i fastify-opentelemetry
```
