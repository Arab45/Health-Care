const express = require("express");
const { createProvider, fetchAllProvider, updateProvider, deleteProvider } = require("../controller/providerContoller");
const { validateProvider, validation } = require("../middleware/validator");
const { verifyLoginAdminToken } = require("../controller/adminAuthController");
const router = express.Router();


router.post('/create-account',validateProvider, validation, verifyLoginAdminToken, createProvider);
router.get('/all-provider', fetchAllProvider);
router.put('provider-update/:id', updateProvider);
router.delete('/deleted-provider/:id', deleteProvider);

module.exports = router