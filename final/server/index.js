import express from "express";
import bodyParser from "body-parser";

const app = express();

const users = new Map();
[
  { id: "john@beatles.com", password: "Password123" },
  { id: "paul@beatles.com", password: "Password123" },
  { id: "george@beatles.com", password: "Password123" },
  { id: "ringo@beatles.com", password: "Password123" },
].forEach((user) => users.set(user.id, user));

app.use(express.static("./public"));
app.use(express.json());
app.use(function incoming(req, _res, next) {
  console.log(req.method, req.path, req.query);
  console.log(req.headers);
  console.log(req.body);
  next();
});

app.post(
  "/submit",
  bodyParser.urlencoded({ type: "application/x-www-form-urlencoded" }),
  function handle(req, res) {
    const storedUser = users.get(req.body.username);
    const storedPassword = storedUser?.password;
    const inputPassword = req.body.password;

    if (storedUser && storedPassword === inputPassword) {
      console.log("logging in as", storedUser.id);
      res.setHeader("Location", "/success.html?user=" + storedUser.id);
      res.statusCode = 301;
      res.send();
    } else {
      console.log("Unable to log in as", storedUser?.id);
      res.setHeader("Location", "/?error=Unable to login");
      res.statusCode = 301;
      res.send();
    }
  }
);

app.use(function response(req, res, next) {
  console.log(res.statusCode);
  console.log(res.body);
  next();
});

app.listen(8080, console.log("listening on http://localhost:8080"));
