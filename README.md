Use fastify-cli to generate the project

```
fastify generate <> --lang=ts
```

Remove the packages `tap @types/tap cross-env`

Add Jest for Testing

```
npm i -D jest @types/jest ts-jest
npx jest --init
npx ts-jest config:init
```

Env variable handling

```
npm i env-schema fluent-json-schema
```

Add config.ts file in src/plugins

```
npm i graphql mercurius mercurius-auth nexus nexus-prisma
npm i -D prisma
npx prisma init
```

Add the schema to `schema.prisma` in prisma folder
Run `npx prisma generate`

Create the db connection plugin `db.ts` in src/plugins
Create the mercurius server options object in `config/graphql-server-config`
Create the graphql server using mercurius in `graphql-server.ts` in src/plugins
