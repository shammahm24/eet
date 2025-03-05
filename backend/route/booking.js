const express = require("express");
const {addBooking, getAll} = require("../controller/booking")


const router = express.Router();

// create new booking
router.post("/",(req, res, next) => {
    addBooking(req,res,next);
});

// get all bookings
router.get("/", (req, res, next) => {
    getAll(req, res, next);
});

// update booking by id
router.patch("/:id", (req, res) => {
    const _id = req.params.id;

    res.status(200).json({
        message : `booking updated id : ${_id}`
    });
});

// get all bookings
router.get("/", (req, res) => {
    res.status(200).json({
        message : "got all bookings"
    });
});

// get booking by id
router.get("/:id", (req, res) => {
    const _id = req.params.id

    res.status(200).json({
        message : `Got booking id : ${_id}`
    });
});

router.delete("/:id", (req, res) => {
    const _id = req.params.id;

    res.status(200).json({
        message : `booking deleted ${_id}`
    })
})

module.exports = router;