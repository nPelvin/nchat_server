// loads express and cors middleware
const express = require("express");
const cors = require("cors");

// puts a new express function inside the app variable
const app = express();

// chooses the server port
const port = 5000;

// tells cors to expect traffic from localhost 3000 our react frontend
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// recognizes the incoming Request object as a JSON
app.use(express.json());

//hardcoded welcome message
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
let messages = [welcomeMessage];


//ability to edit message by id
app.post("/messages/:id", cors(), (req, res) => {
  for (let i=0 ; i<messages.length; i++){
if (messages[i].id==req.params.id){
  messages[i].text = req.body.text;
  messages[i].from = req.body.from;
}
}
  res.send(JSON.stringify(messages));}
);

// setting up POST routing
app.post("/messages", (req, res) => {
  if (
    typeof req.body.text != "string" ||
    typeof req.body.from != "string" ||
    req.body.text.length < 1 ||
    req.body.from.length < 1
  ) {
    res.status(400).send("Sorry, we cannot do that!");
  } else {
    const incomingMessage = req.body;
    incomingMessage.id = messages.length;
    incomingMessage.timeSent=new Date();
    messages.push(incomingMessage);
    console.log(messages);
    res.send(JSON.stringify(incomingMessage));
  }
});


//ability to delete message by id
app.delete("/messages/:id", cors(), (req, res) => {
  let wantedMessages=messages.filter(x=>x.id!=req.params.id);

  messages = wantedMessages.slice(0);
  res.send(JSON.stringify(messages));
});

// ability to GET message by search
app.get("/messages/latest", cors(), (req, res) => {
  const newArray = messages.filter(x=>x.id+10>messages.length); 
  res.send(JSON.stringify(newArray));
});

// ability to GET message by search
app.get("/messages/search", cors(), (req, res) => {
  const newArray = messages.filter(x=>x.text.includes(req.query.text)); 
  res.send(JSON.stringify(newArray));
});


// ability to GET message by id
app.get("/messages/:id", cors(), (req, res) => {
  let wantedMessage = messages.filter((x) => x.id == req.params.id);
  res.send(JSON.stringify(wantedMessage));
});

// ability to get all messages
app.get("/messages", cors(), (req, res) => {
  res.send(JSON.stringify(messages));
});

// generic welcome message
app.get("/", cors(), (req, res) => {
  res.send(JSON.stringify("Hello World!"));
});

// sets server to listen at nominated port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
