const sendMail = require("../src/utils/sendMail");
const { sendSuccess } = require("../src/middleware");
const { registrationEmailATemp, adminEmailATemp } = require("../public/main/userEmailRegistration");
const { loginSessiontemp, adminSessiontemp } = require("../public/main/loginSessionTemp");
const { resetPassTemp } = require("../public/main/forgetPasswordTemp");
const User = require("../src/model/User");
const { resetPasswordSuccessTemp } = require("../public/main/successfullResetEmailTemp");
const Admin = require("../src/model/Admin");


const sendUserEmail = async (req, res) => {
    const { newUser } = req.body;
    const email = newUser.email;
    const username = newUser.username;
    const subject = 'User account created';
    const body = registrationEmailATemp(username);

    try {
        sendMail(email, subject, body);
    } catch (error) {
        console.log(error.message);
        return sendSuccess(res, 'You have register but we can not send you a email at the moment');   
    }
    return sendSuccess(res, 'Email has been successfully send to you.', newUser);
};

const userSessionEmail = async (req, res) => {
    const userId = req.id;
    const user = await User.findById(userId);
    console.log(`from nodemailer ${user}`);
    const email = user.email;
    const username = user.username;
    const subject = 'Verify that it is you!';
    const body = loginSessiontemp(username);

    try {
        sendMail(email, subject, body);
    } catch (error) {
        console.log(error.message);
        return sendSuccess(res, 'Unable to send the OTP email. Please try again.');   
    }
    return sendSuccess( res, 'Email has been successfully send to you.', user );
};

const userResetPasswordEmail = async (req, res) => {
    const { resetToken, user } = req.body;
     
     const email = user.email;
     const username = user.username;
     const subject = 'Verify that it is you!';
     const body = resetPassTemp( username, resetToken );
 
     try {
         sendMail(email, subject, body);
     } catch (error) {
         console.log(error.message);
         return sendSuccess(res, 'Unable to send the OTP email. Please try again.');   
     }
     return sendSuccess( res, 'Email has been successfully send to you.', user );
 };
 
 
 const userEmailPasswordSuccess = async (req, res) => {
     const { upadatePassword } = req.body;
     const email = upadatePassword.email;
      const username = upadatePassword.username;
      const subject = 'Successfully reset password!';
      const body = resetPasswordSuccessTemp( username );
  
      try {
          sendMail(email, subject, body);
      } catch (error) {
          console.log(error.message);
          return sendSuccess(res, 'Unable to reset password. Please try again.');   
      }
      return sendSuccess( res, 'Email has been successfully send to you.', upadatePassword );
  };

  //Admin email template

  const sendAdminEmail = async (req, res) => {
    const { newAdmin } = req.body;
    const email = newAdmin.email;
    const username = newAdmin.username;
    const subject = 'Admin account created';
    const body = adminEmailATemp(username);

    try {
        sendMail(email, subject, body);
    } catch (error) {
        console.log(error.message);
        return sendSuccess(res, 'You have register but we can not send you a email at the moment');   
    }
    return sendSuccess(res, 'Email has been successfully send to you.', newAdmin);
};

const adminSessionEmail = async (req, res) => {
    const adminId = req.id;
    const admin = await Admin.findById(adminId);
    const email = admin.email;
    const username = admin.username;
    const subject = 'Verify that it is you!';
    const body = adminSessiontemp(username);

    try {
        sendMail(email, subject, body);
    } catch (error) {
        console.log(error.message);
        return sendSuccess(res, 'Unable to send the OTP email. Please try again.');   
    }
    return sendSuccess( res, 'Email has been successfully send to you.', admin );
};

const adminresetPasswordEmail = async (req, res) => {
    const { resetToken, admin } = req.body;
     
     const email = admin.email;
     const username = admin.username;
     const subject = 'Verify that it is you!';
     const body = resetPassTemp( username, resetToken );
 
     try {
         sendMail(email, subject, body);
     } catch (error) {
         console.log(error.message);
         return sendSuccess(res, 'Unable to send email. Please try again.');   
     }
     return sendSuccess( res, 'Email has been successfully send to you.', admin );
 };

 const adminresetPasswordSuccess = async (req, res) => {
    const { upadatePassword } = req.body;
    const email = upadatePassword.email;
     const username = upadatePassword.username;
     const subject = 'Successfully reset password!';
     const body = resetPasswordSuccessTemp( username );
 
     try {
         sendMail(email, subject, body);
     } catch (error) {
         console.log(error.message);
         return sendSuccess(res, 'Unable to reset password. Please try again.');   
     }
     return sendSuccess( res, 'Email has been successfully send to you.', upadatePassword );
 };

 

module.exports = {
    sendUserEmail,
    userSessionEmail,
    userResetPasswordEmail,
    userEmailPasswordSuccess,
    sendAdminEmail,
    adminSessionEmail,
    adminresetPasswordEmail,
    adminresetPasswordSuccess
}