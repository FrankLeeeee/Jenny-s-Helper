var express = require("express");
app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(5000);