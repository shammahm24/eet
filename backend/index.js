const express = require("express");
const http = require("http")
const morgan = require("morgan");

//import custom routes

//create express server
app = express();
http.Server(app)

//configure environment variables
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(morgan('dev'))

//Configure Routres
app.get('/',(req, res) =>{
    res.json({"message" : "EET Server"})
})

// Start server
app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})