const polka = require("polka");
const app = polka();

app.get("/", function (req, res) {
  res.end("Hello, World!");
});

app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
