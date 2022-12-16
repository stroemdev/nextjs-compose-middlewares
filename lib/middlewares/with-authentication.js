export function withAuthentication(handler) {
  return async function authenticationMiddleware(req, res) {
    if (!req.cookies.auth && !req.headers.auth) {
      res.status(401).end();
      return;
    }

    await handler(req, res);
  };
}
