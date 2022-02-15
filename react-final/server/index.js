import express from "express";
import auth from "./auth.js";

const app = express();

/** @NOTE this is how you abstract and move routes */
app.use("/auth", auth);

app.use(express.static("./public"));
app.listen(8080, () => console.log("Listening on http://localhost:8080/"));
