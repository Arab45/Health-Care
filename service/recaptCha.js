const axios = require("axios");
const { sendError, sendSuccess } = require("../src/middleware");

const botAuthentication = async (req, res) => {
    const { recaptchaResponse, formData } = req.body;
    console.log(recaptchaResponse);

    if(!recaptchaResponse){
        return sendError(res, 'recachap respond is required')
    };

    try {
        const googleResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
              secret: process.env.GOOGLE_RECAPTCHA_SECRETE_KEY,    // reCAPTCHA Secret Key
              response: recaptchaResponse   // The reCAPTCHA response from the frontend
            }
          });

          const data = googleResponse.data;  // Get the response data from Google reCAPTCHA
          console.log(data);
          // Check if the reCAPTCHA was verified successfully
          if(data.success){
                // If verification is successful, process the form data (e.g., save it to a database)
                console.log('Form Data:', formData);   // Logging the form data for demonstration
                return sendSuccess(res, 'Form submitted successfully!')
          } else {
            return sendError(res, 'reCAPTCHA verification failed. Please try again.');
          }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        return sendError(res, 'Internal Server Error', 500)
    }
};

module.exports = botAuthentication