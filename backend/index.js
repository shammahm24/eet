const bodyParser = require("body-parser");
const cors  = require("cors");
const express = require("express");
const http = require("http")
const mongoose = require("mongoose");
const morgan = require("morgan");

//import custom routes
const bookingRoutes = require("./route/booking");

//create express server
app = express();
http.Server(app)

//configure environment variables
require("dotenv").config();
const port = process.env.PORT || 3002;
const db_uri = process.env.DB_URI

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(db_uri, {});
const connection =  mongoose.connection;
connection.once('open', ()=> {
    console.log("Database connection successful!");
})

//Configure Routres
app.get('/',(req, res) =>{
    res.json({"message" : "EET Server"});
})

app.use("/api/bookings/", bookingRoutes);

app.use((req, res, next) =>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, next) =>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

// Start server
app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})