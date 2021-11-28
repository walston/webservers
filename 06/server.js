const polka = require("polka");
const textBodyParser = require("body-parser").text();

/////////////// GLOBALS ///////////////
const app = polka();
const USERS = ["Huey", "Dewey", "Louis"];

/////////////// APP LOGIC ///////////////
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
