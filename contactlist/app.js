// importing the modules.

var bodyparser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");

var app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('err', (err)=>{
  if(err){
    console.log("Error in database connection!"+err);
  }
});


// port number
const port = 3000;

// Adding middleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname,'public')));

const route = require("./routes/route");

app.use("/api", route);

// Testing server
app.get("/", (req, res) => {
  res.send("Hello, I'm working fine");
});
app.listen(port, () => {
  console.log("Server listening at port " + port);
});
