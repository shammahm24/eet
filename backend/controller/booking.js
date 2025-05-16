const mongoose = require("mongoose")
const Booking = require("../model/booking");

const fields = ["_id", "email", "phone","firstName", "lastName", "startLocation", "endLocation", "arrivalTime", "pickUpDate", "pickUpTime","flightCode","carType", "fee","status", "createdAt", "updatedAt","__v"]
/*
Todo : check for preexisting active booking from same email at same time.
checking preexisting values will be built into user controller from initial 
build.
*/
function addBooking(req, res, next){
    const body = req.body;
    const booking = new Booking({
        _id : new mongoose.Types.ObjectId(),
        email : body.email,
        phone : body.email,
        firstName : body.firstName,
        lastName : body.lastName,
        startLocation : body.startLoc,
        endLocation : body.endLoc,
        pickUpTime : new Date(body.time),
        pickUpdate : new Date(body.date),
        flightCode : body.flightCode,
        carType : body.carType,
        distance : body.miles,
        fee : body.fee,
        status : body.status,
        comments : body.comments,
    });

    booking
        .save()
        .then((result) => {
            res.status(201).json({
                message : 'Booking Added',
                booking : result
            });
        })
        .catch((err) => {
            res.status(500).json({
                error : err.message
            });
        });
}

function getAll(req, res, next){
    
    Booking.find().select(fields).exec().then(docs => {
        const response = {
            count : docs.length,
            bookings : docs.map(doc =>{
                return{
                    _doc : doc
                }
            })
        }

        if(docs.length >= 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message : "No bookings found"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });

    
}

function getOne(req, res, next) {
    const id = req.params.id
    Booking.findById({_id:id})
    .select(fields)
    .exec()
    .then(doc =>{
        if(doc){
            res.status(200).json(doc)
        } else{
            res.status(404).json({
                message : "No booking found"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

function patchOne(req, res, next) {
    
}

module.exports = {
    addBooking,
    getAll,
    getOne
}