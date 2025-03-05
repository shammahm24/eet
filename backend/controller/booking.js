const mongoose = require("mongoose")
const Booking = require("../model/booking");

function addBooking(req, res, next){
    const body = red.body;
    const booking = new Booking({
        _id : mongoose.Types.ObjectId(),
        email : body.email,
        phone : body.email,
        firstName : body.firstName,
        lastName : body.lastName,
        startLocation : {
            type : "Point",
            coordinates : [body.startLocation.longitude, body.startLocation.latitude],
        },
        endLocation : {
            type : "Point",
            coordinates : [body.endLocation.longitude, body.endLocation.latitude],
        },
        flightCode : body.flightCode,
        carType : body.carType,
        status : body.status,
        comments : body.comments,
    });

    booking
        .save()
        .then((result) => {
            resolve(res.status(201).json({
                message : 'Booking Added',
                booking : result
            }));
        })
        .catch((err) => {
            reject(res.status(500).json({
                error : err.message
            }));
        });
}

module.exports = {
    addBooking
}