import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";

import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";

import { loadConfig } from "../plugins/config";

loadConfig();

const sdk = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      process.env.SERVICE_NAME || "default_name",
    [SemanticResourceAttributes.SERVICE_VERSION]:
      process.env.SERVICE_VERSION || "default_version",
  }),
});

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, req) => {
        span.setAttribute("attr_key", "attr_value");
      },
    }),
    new GraphQLInstrumentation({
      depth: 3,
    }),
  ],
});

if (process.env.ZIPKIN_EXPORTER === "true") {
  sdk.addSpanProcessor(
    new SimpleSpanProcessor(
      new ZipkinExporter({
        serviceName: process.env.SERVICE_NAME,
        url: process.env.ZIPKIN_URL,
      })
    )
  );
}

if (process.env.CONSOLE_EXPORTER === "true") {
  sdk.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
}

sdk.register();

//   sdk.register({
//     contextManager: new AsyncHooksContextManager().enable(),
//     propagator: new HttpTraceContextPropagator(),
//   })

export default sdk;
