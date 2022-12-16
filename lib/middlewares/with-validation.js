export function withValidation(schema) {
  return function withValidationHandler(handler) {
    return async function validationMiddleWare(req, res) {
      try {
        const values = await schema.validateAsync(req.body);
        req.body = values;
        await handler(req, res);
      } catch (error) {
        return res.status(400).json(error);
      }
    };
  };
}
