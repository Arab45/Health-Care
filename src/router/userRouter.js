const express = require("express");
const router = express.Router();
const {  signUp, fetchSingleUser, fetchAllUser } = require("../controller/userController");
const { 
    loginProcess, 
    loginAttempt, 
    verifyLoginUserToken, 
    logOut,
    forgetPasswordToken,
    resetPassword } = require("../controller/userAuthController")
const { validation, validateSignUp } = require("../middleware/validator");
const  { userExistence } = require("../middleware/user");
const { sendUserEmail, userSessionEmail, userResetPasswordEmail, userEmailPasswordSuccess } = require("../../service/userEmailTemp");


router.post('/signUp', validateSignUp, validation, userExistence, signUp, sendUserEmail);
router.post('/signIn', loginProcess, loginAttempt); 
router.get('/verifyLogin', verifyLoginUserToken, userSessionEmail );
router.get('/logout', logOut);
router.post('/forgetPassword', forgetPasswordToken, userResetPasswordEmail);
router.get('/reset-password/:token', resetPassword, userEmailPasswordSuccess);


module.exports = router