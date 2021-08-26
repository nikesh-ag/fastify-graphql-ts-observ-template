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

Add env variable handling

```
npm i env-schema
```

Add config.ts file in src/utils
