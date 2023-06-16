// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let timeFormatRegex = /^\/api\/\d{4}-\d{2}-\d{2}$/
let UNIXFormatRegex = /^\/api\/\d{13}$/

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get(/^\/api(.*)/, function (req, res) {
  let input = req.params[0]
  let userDate;
  //Try parsing utc string
  userDate = new Date(input)
  console.log(input)
  if (userDate == "Invalid Date"){
    input = input.replace("/","")
   userDate = new Date(parseInt(input))
    }
  // return time object
  if(req.params[0] == ""){
    userDate = new Date()
  }
  if (userDate != "Invalid Date"){
  res.json({unix: Math.floor(userDate)/1, utc:userDate.toUTCString()});
  }else{
  //give error
  res.json({"error":"Invalid Date"});
  }
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
