const express = require('express');
const router = express.Router()
const { signUp, adminLoginId, loginAttempt, verifyLoginAdminToken, logOut, forgetPasswordToken, resetPassword } = require('../controller/adminAuthController');
const { validateSignUp, validation } = require('../middleware/validator');
const {  adminExistence } = require('../middleware/admin');
const { sendAdminEmail, adminSessionEmail, adminresetPasswordEmail, adminresetPasswordSuccess } = require('../../service/userEmailTemp');

router.post('/create-signUp', validateSignUp, validation,  adminExistence, signUp, sendAdminEmail);
router.post('/signIn', adminLoginId, loginAttempt);
router.get('/verifySignIn', verifyLoginAdminToken, adminSessionEmail);
router.get('/logout', logOut);
router.post('/forgetPassword', forgetPasswordToken, adminresetPasswordEmail);
router.get('/verifyResetPass/:token', resetPassword, adminresetPasswordSuccess);

module.exports = router