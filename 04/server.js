const polka = require("polka");
const sirv = require("sirv");

const app = polka();
const assets = sirv("public");

function logger(req, res, next) {
  console.log("****");
  console.log("Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  console.log("****");
  next();
}

app.use(logger, assets);

app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
