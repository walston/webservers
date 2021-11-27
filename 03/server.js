const polka = require("polka");
const sirv = require("sirv");

const app = polka();
const assets = sirv("public");

app.use(assets);

app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
