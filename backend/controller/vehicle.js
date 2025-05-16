const mongoose = require("mongoose")
const Vehicle = require("../model/vehicle");
const fields = ["_id", "vehicleType", "price", "seats", "luggage", "image", "status", "createdAt", "updatedAt","__v"]

const vehicles = [
    {
        type : "Luxury Sedan",
        price : 3.54,
        seats : 3,
        luggage : 3,
        image : "/car-card/sedan-img.png"

    },
    {
        type: "Luxury SUV",
        price : 4.97,
        seats : 4,
        luggage : 4,
        image : "/car-card/compact-suv-img.png"
    },
    {
        type : "Luxury XL SUV",
        price : 5.82,
        seats : 6,
        luggage : 6,
        image : "/car-card/suv-img.png"
    }
]

function addVehicle(req, res, next){
    const body = req.body;
    const vehicle = new Vehicle({
        _id : new mongoose.Types.ObjectId(),
        vehicleType : body.vehicleType,
        price : body.price,
        seats : body.seats,
        luggage : body.luggage,
        image : body.image,
        status : body.status
    });

    vehicle
        .save()
        .then((result) => {
            res.status(201).json({
                message : 'Vehicle Added',
                vehicle : result
            });
        })
        .catch((err) => {
            res.status(500).json({
                error : err.message
            });
        });
}
function getAll(req, res, next){
    Vehicle.find().select(fields).exec().then(docs => {
        const response = {
            count : docs.length,
            vehicles : docs.map(doc =>{
                return{
                    _doc : doc
                }
            })
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error : err.message
        });
    });
}
function getById(req, res, next){
    const id = req.params.vehicleId;
    Vehicle.findById(id).select(fields).exec().then(doc => {
        if(doc) {
            res.status(200).json({
                vehicle : doc
            });
        } else {
            res.status(404).json({
                message : "No valid entry found for provided ID"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error : err.message
        });
    });
}
function updateVehicle(req, res, next){
    const id = req.params.vehicleId;
    const body = req.body;
    Vehicle.updateOne({_id : id}, {
        $set : {
            vehicleType : body.vehicleType,
            price : body.price,
            seats : body.seats,
            luggage : body.luggage,
            image : body.image,
            status : body.status
        }
    }).exec().then(result => {
        res.status(200).json({
            message : "Vehicle updated",
            result : result
        });
    }).catch(err => {
        res.status(500).json({
            error : err.message
        });
    });
}
function deleteVehicle(req, res, next){
    const id = req.params.vehicleId;
    Vehicle.deleteOne({_id : id}).exec().then(result => {
        res.status(200).json({
            message : "Vehicle deleted",
            result : result
        });
    }).catch(err => {
        res.status(500).json({
            error : err.message
        });
    });
}
function getpriceAll(req, res, next) {
    const { distance, extra, tax } = req.query;

    if (!distance) {
        return res.status(400).json({
            message: "Distance is required query parameters"
        });
    }

    Vehicle.find().select(fields).exec().then(docs => {
        const response = {
            count: docs.length,
            vehicles: docs.map(doc => {
                const basePrice = doc.price;
                const recalculatedPrice = (basePrice * distance) + (extra || 0) //+ (basePrice * tax);
                return {
                    ...doc._doc,
                    recalculatedPrice: recalculatedPrice.toFixed(2)
                };
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
}

module.exports = {
    addVehicle,
    getAll,
    getById,
    updateVehicle,
    deleteVehicle,
    getpriceAll
}