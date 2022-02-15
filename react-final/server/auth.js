import express from "express";

const auth = express.Router();

auth.post("/login", express.json(), (req, res) => {
  res.status(200).send();
});

export default auth;
