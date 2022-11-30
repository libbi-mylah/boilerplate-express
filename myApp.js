require("dotenv").config();
var bodyParser = require("body-parser");

let express = require("express");
let app = express();
console.log("Hello World");

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", function (req, res) {
  //res.send('Hello Express');
  res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  // res.json({"message": "Hello json"});
  var mySecret = process.env["MESSAGE_STYLE"];
  if (mySecret === "uppercase") {
    res.json({ message: "HELLO JSON".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/name", function (req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;
