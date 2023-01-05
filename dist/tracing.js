"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opentelemetry = require("@opentelemetry/sdk-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const instrumentation_1 = require("@opentelemetry/instrumentation");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
(0, instrumentation_1.registerInstrumentations)({
    instrumentations: [],
});
const resource = resources_1.Resource.default().merge(new resources_1.Resource({
    [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: "service-name-here",
    [semantic_conventions_1.SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
}));
const provider = new sdk_trace_node_1.NodeTracerProvider({
    resource: resource,
});
const exporter = new sdk_trace_base_1.ConsoleSpanExporter();
const processor = new sdk_trace_base_1.BatchSpanProcessor(exporter);
provider.addSpanProcessor(processor);
provider.addSpanProcessor(new sdk_trace_base_1.BatchSpanProcessor(new exporter_zipkin_1.ZipkinExporter()));
provider.register();
const sdk = new opentelemetry.NodeSDK({
    traceExporter: new exporter_trace_otlp_http_1.OTLPTraceExporter({
        url: "http://localhost:4318/v1/traces",
        headers: {},
    }),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
sdk.start();
//# sourceMappingURL=tracing.js.map