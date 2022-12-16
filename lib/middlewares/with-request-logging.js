export function withRequestLogging(handler) {
  return async function requestLoggingMiddleware(req, res) {
    req.log = (...message) => {
      console.log(
        `${req.method} ${req.url} ${new Date().toISOString()}: ${message.join(
          " "
        )}`
      );
    };
    const start = new Date();
    req.log("Start");
    await handler(req, res);
    const completed = new Date();
    req.log(
      `Done (${
        (completed.getMilliseconds() - start.getMilliseconds()) / 1000
      }s) ${res.statusCode}`
    );
  };
}
