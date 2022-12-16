import crypto from "crypto";

export function withCorrelationId(handler) {
  return async function correlationIdMiddleware(req, res) {
    req.correlationId = req.headers["x-correlation"] ?? crypto.randomUUID();
    await handler(req, res);
  };
}
