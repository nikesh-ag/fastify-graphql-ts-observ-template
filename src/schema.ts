import { makeSchema } from "nexus";
import { join } from "path";

import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, "generated", "schema.gen.graphql"),
    typegen: join(__dirname, "generated", "nexus-typegen.gen.ts"),
  },
  contextType: {
    module: join(__dirname, "config", "context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
