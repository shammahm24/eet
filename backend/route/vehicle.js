const express = require("express");
const mongoose = require("mongoose");
const {addVehicle,
    getAll,
    getById,
    updateVehicle,
    deleteVehicle,
    getpriceAll} = require("../controller/vehicle");

const router = express.Router();

router.post("/", (req, res) => {
    addVehicle(req, res);
});
router.get("/", (req, res) => {
    getAll(req, res);
});
router.get("/price", (req, res) => {
    getpriceAll(req, res);
});
router.put("/:vehicleId", (req, res) => {
    updateVehicle(req, res);
});
router.get("/:vehicleId", (req, res) => {
    getById(req, res);
}); 
router.delete("/:vehicleId", (req, res) => {
    deleteVehicle(req, res);
});

module.exports = router;