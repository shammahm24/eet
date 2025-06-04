const mongoose = require("mongoose")
const Booking = require("../model/booking");

const fields = ["_id", "email", "phone","firstName", "lastName", "startLocation", "endLocation", "arrivalTime", "pickUpDate", "pickUpTime","flightCode","carType", "fee","status", "createdAt", "updatedAt","__v"]

async function addBooking(req, res, next) {
    const body = req.body;

    // Combine date and time into a single Date object
    const dateStr = body.date; // e.g. "2025-05-19"
    const timeStr = body.time; // e.g. "2345"
    
    const [year, month, day] = dateStr.split('-').map(Number);
    // Parse time
    const [hours, minutes] = timeStr.split(':').map(Number);
    const pickUpDateTime = new Date(dateStr);
    pickUpDateTime.setHours(hours, minutes, 0, 0);

    console.log("pickUpDateTime", pickUpDateTime);
    try {
        // Check for existing booking with same email, location, and exact datetime
        const existing = await Booking.findOne({
            email: body.email,
            startLocation: body.startLoc,
            pickUpTime: pickUpDateTime
        });

        if (existing) {
            return res.status(409).json({
                message: 'A booking with the same email, location, and pickup time already exists.'
            });
        }

        // Create booking
        const booking = new Booking({
            _id: new mongoose.Types.ObjectId(),
            email: body.email,
            phone: body.phone,
            firstName: body.firstName,
            lastName: body.lastName,
            startLocation: body.startLoc,
            endLocation: body.endLoc,
            pickUpDateTime: pickUpDateTime,
            arrivalDateTime: pickUpDateTime, // use same time unless different
            flightCode: body.flightCode,
            carType: body.carType,
            distance: body.miles,
            fee: body.fee,
            status: body.status,
            comments: body.comments,
        });

        const result = await booking.save();
        res.status(201).json({
            message: 'Booking Added',
            booking: result
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
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