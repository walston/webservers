const polka = require("polka");

/////////////// GLOBALS ///////////////
const app = polka();

/////////////// APP LOGIC ///////////////
function logger(req, res, next) {
  console.log("****");
  console.log("Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("****");
  next();
}

app.use(logger);
/** @NOTE this function handler will only be triggered on "GET /" http requests */
app.get("/", function (req, res) {
  console.log("Received a GET request for '/'");
  res.end("Ok");
});
/** @NOTE this function handler will only be triggered on "POST /" http requests */
app.post("/", function (req, res) {
  console.log("Received a POST request for '/'");
  res.end("Ok");
});

/////////////// INITIALIZE ///////////////
app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
