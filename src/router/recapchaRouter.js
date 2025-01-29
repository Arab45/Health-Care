const express = require("express");
const botAuthentication = require("../../service/recaptCha");
const router = express.Router();

router.post('/submit-form', botAuthentication);

module.exports = router;