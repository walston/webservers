import express from "express";

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(function incoming(req, _res, next) {
  console.log(req.method, req.path, req.query);
  console.log(req.headers);
  console.log(req.body);
  next();
});

app.use(function response(req, res, next) {
  console.log(res.statusCode);
  console.log(res.body);
  next();
});

app.listen(8080, console.log("listening on http://localhost:8080"));
