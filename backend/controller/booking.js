const mongoose = require("mongoose")
const Booking = require("../model/booking");

function addBooking(req, res, next){
    const body = req.body;
    const startCoordinates = body.endLocation?.coordinates;
    const endCoordinates = body.endLocation?.coordinates;
    const booking = new Booking({
        _id : new mongoose.Types.ObjectId(),
        email : body.email,
        phone : body.email,
        firstName : body.firstName,
        lastName : body.lastName,
        startLocation : {
            type : "Point",
            coordinates : startCoordinates,
        },
        endLocation : {
            type : "Point",
            coordinates : endCoordinates,
        },
        flightCode : body.flightCode,
        carType : body.carType,
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

}

module.exports = {
    addBooking
}