const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const locationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    } });

const bookingSchema = new Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    email : {
        type : String,
        required : true,
        validator : function(v) {
            return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 international format
        }
    },
    phone : {
        type : String,
        required : true,
        validator : function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
        }
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    startLocation : {
        type : locationSchema
    },
    endLocation : {
        type : locationSchema
    },
    flightCode : {
        type : String,
    },
    carType : {
        type : String,
    },
    status : {
        type : String,
        enum : ["pending", "booked", "waiting", "driving", "complete", "cancelled"]
    },
    comments : {
        types : String
    }
}, {timestamps : true});

module.exports = Booking = mongoose.model("bookings", bookingSchema);