const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());

app.post("/messages", cors(), (req, res) => {
  // working
  console.log("Check logged to gitbash");
  // not working
  console.log(JSON.stringify(req.body.text));
  console.log(JSON.stringify(req.body));
  console.log(req.body);
  //not working
  console.log(req.body.text);
  //working?
  //   res.send(JSON.stringify("newMessage"));
  res.send(req.body.text);
});

app.get("/", cors(), (req, res) => {
  res.send(JSON.stringify("Hello World!"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
