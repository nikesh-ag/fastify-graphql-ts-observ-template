import path from "path";
import envSchema from "env-schema";

interface Env {
  NODE_ENV: string;
}

const schema = {
  type: "object",
  required: ["NODE_ENV"],
  properties: {
    NODE_ENV: {
      type: "string",
      default: "development",
    },
  },
};

export default function loadConfig(): void {
  const result = require("dotenv").config({
    path: path.join(
      __dirname,
      `../../${process.env.NODE_ENV ?? "development"}.env`
    ),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  envSchema<Env>({
    data: result.parsed,
    schema,
  });
}
