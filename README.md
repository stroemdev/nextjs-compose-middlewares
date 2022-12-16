## Next.JS middlewares
Since NextJS does not have a middleware system this is a example how to solve it using multiple middlewares.

Ther is some rules how middlewares are defined

* The middleware must be a HOF (Higher-order Function), meaning it will accept the handler (api handler or another middleware) as the first argument returning a new handler
* The returned handler **must** be async and await the handler
* If you need to pass arguments you can do it like the example _with-validation.js_ that first accepts the argument and then returns the actual middleware HOF

When all these rules are applied you can either use a single or combine them using the **compose** function exported from _compose.js_. This function simply combines the function from right to left to build a chain of functions that will call each other, or short circuit everything by not invoking the next handler. (See _with-authentication.js_)