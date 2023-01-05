import * as opentelemetry from "@opentelemetry/sdk-node";
import { BatchSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
//import opentelemetry from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";


// Optionally register instrumentation libraries
registerInstrumentations({
  instrumentations: [],
});

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "service-name-here",
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
    })
  );

const provider = new NodeTracerProvider({
    resource: resource,
});
const exporter = new ConsoleSpanExporter();
const processor = new BatchSpanProcessor(exporter);
provider.addSpanProcessor(processor);
provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter()));

provider.register();

const sdk = new opentelemetry.NodeSDK({
    traceExporter: new OTLPTraceExporter({
      // optional - default url is http://localhost:4318/v1/traces
      url: "http://localhost:4318/v1/traces",
      // optional - collection of custom headers to be sent with each request, empty by default
      headers: {},
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();