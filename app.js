const express = require("express");

const app = express();

app.use(express.static("public"));

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

app.listen(3000, () => {
  console.log("The application is running on localhost:3000.");
});
