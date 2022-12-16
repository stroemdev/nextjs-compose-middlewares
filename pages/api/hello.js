import { setTimeout } from "timers/promises";

import Joi from "joi";

import { compose } from "../../lib/middlewares/compose";
import { withAuthentication } from "../../lib/middlewares/with-authentication";
import { withCorrelationId } from "../../lib/middlewares/with-correlation-id";
import { withValidation } from "../../lib/middlewares/with-validation";
import { withRequestLogging } from "../../lib/middlewares/with-request-logging";

const schema = Joi.object({
  msg: Joi.string().required().min(10).lowercase().trim(),
});

export default compose(
  withRequestLogging,
  withAuthentication,
  withCorrelationId,
  withValidation(schema)
)(handler);

async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  const value = await getSomethingAsync();
  req.log("correlation", req.correlationId);
  res.status(200).json({ name: "John Doe", msg: req.body.msg, value });
}

async function getSomethingAsync() {
  await setTimeout(250);

  return Math.floor(Math.random() * 10_000);
}
