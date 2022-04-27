const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/fonts", express.static(__dirname + "public/fonts"));
app.use("/js", express.static(__dirname + "public/js"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(401).json({
    request: "success",
  });
});

app.get("/signuptest", (req, res) => {
  res.render("signuptest");
});

app.get("/home", (req, res) => {
  res.render("home");
});

module.exports = app;
