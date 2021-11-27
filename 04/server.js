const polka = require("polka");
const sirv = require("sirv");

/////////////// GLOBALS ///////////////
const app = polka();
const assets = sirv("public");

/////////////// APP LOGIC ///////////////
/**
 * @NOTE
 * I mentioned middleware in the last lesson but
 * let's cover what a middleware is.
 *
 * Middleware is software, in the context of http-servers,
 * that lies between the initial HTTP request that came over the wire
 * and the eventual response to be sent back over that wire.
 *
 * The most common pattern for webserver middleware is a simple function
 * that takes in 3 arguments: Request, Response, and a next callback.
 * the expectation is that next() be called after all processing is done,
 * which will tell the framework calling **your** middleware to call
 * the **"next"** middleware.
 *
 * The idea is to let as many middleware handles as needed access each request
 *
 * Here we build a simple `logger` middleware
 * that will print the request to the console
 */
function logger(req, res, next) {
  console.log("****");
  console.log("Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("****");
  next();
}

app.use(logger, assets);

/////////////// INITIALIZE ///////////////
app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
