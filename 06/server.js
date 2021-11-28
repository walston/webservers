const polka = require("polka");
/** @NOTE Some packages include several exports at the top level, like this. */
const textBodyParser = require("body-parser").text();

/////////////// GLOBALS ///////////////
const app = polka();
/**
 * @NOTE
 * this is considered an "in-memory" dataset, definitely not scalable but
 * it works for this example case */
const USERS = ["Huey", "Dewey", "Louis"];

/////////////// APP LOGIC ///////////////
/**
 * @NOTE
 * middleware **cascades**, meaning the functions are all executed in order,
 * and the same request object is passed to each.
 * If we were to put our logger middleware before textBodyParser `req.body`
 * would be undefined as it is by default. textBodyParser adds `req.body` to
 * the `req` object and would not exist otherwise. */
app.use(textBodyParser, function (req, res, next) {
  console.log(req.method, req.url, req.body);
  next();
});
app.post("/user", function (req, res) {
  USERS.push(req.body);
  res.end("Ok");
});
app.get("/user", function (req, res) {
  res.end(USERS.toString());
});

/////////////// INITIALIZE ///////////////
app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
