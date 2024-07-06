const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send("Hello, it's the server.");
});

app.get("/getData", (req, res) => {
  const positive_Integer = Number(req.query.number);
  if (!req.query.number) {
    res.send("Lack of Parameter");
  } else if (Number.isInteger(positive_Integer) && positive_Integer > 0) {
    const result = ((1 + positive_Integer) * positive_Integer) / 2;
    res.send(`${result}`);
  } else {
    res.send("Wrong Parameter");
  }
});

app.get("/myName", (req, res) => {
  const name = req.cookies.name;
  if (name) {
    res.render("name", { name: name }); //local object
  } else {
    res.render("nameInput");
  }
});

app.post("/trackName", (req, res) => {
  res.cookie("name", req.body.name);
  res.redirect("/myName");
});

// app.get("/trackName", (req, res) => {
//   //   const yourName = req.query.name;
//   //   res.send(`Your name is ${yourName}`);
//   res.redirect("/myName");
// });

app.post("/goodbye", (req, res) => {
  res.clearCookie("name");
  res.redirect("/myName");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000.");
});
