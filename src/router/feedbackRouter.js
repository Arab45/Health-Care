const express = require("express");
const { createFeedback, fetchAllFeedback, updateFeedback, deleteFeedback} = require("../controller/feedbackController");
const { validateFeedback, validation } = require("../middleware/validator");
const router = express.Router();

router.post('/create-feedback', validateFeedback, validation, createFeedback);
router.get('/fetch-all', fetchAllFeedback);
router.put('/update-feedback/:id', updateFeedback);
router.delete('/delete-feedback/:id', deleteFeedback);

module.exports = router