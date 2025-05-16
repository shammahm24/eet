const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const vehicleSchema = new Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    vehicleType : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    seats : {
        type : Number,
        required : true
    },
    luggage : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["available", "unavailable"],
        default : "available"
    },
}, {timestamps : true});

module.exports = Vehicle = mongoose.model("vehicles", vehicleSchema);