const express = require("express");
const { createAppointment, fetchAllAppointment, updateAppointment, deleteAppointment } = require("../controller/appointmentController");
const router = express.Router();

router.post('/create-appointment', createAppointment);
router.get('/fetch-all-appointment', fetchAllAppointment);
router.put('/update-appointment/:id', updateAppointment);
router.delete('/delete-appointment/:id', deleteAppointment);

module.exports = router