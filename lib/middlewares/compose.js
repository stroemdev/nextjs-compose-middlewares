export function compose(...middlewares) {
  return function composedMiddlewares(handler) {
    return middlewares.reduceRight((prev, curr) => curr(prev), handler);
  };
}
