const loginSessiontemp = (username, otp) => {
    // const head = emailHeadTemp();
    const main = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulation Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;"> 
  <h1 style="color: white; margin: 0;">HEALTH ASSURED</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 20px;"><b>Hello, ${username}<b></p>
     <p>Welcome to HEALTH ASSURED, login successfully!</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
    `;
    return main;
};

const adminSessiontemp = ( username ) => {
  // const head = emailHeadTemp();
  const main = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Congratulation Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
<div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;"> 
<h1 style="color: white; margin: 0;">HEALTH ASSURED</h1>
</div>
<div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
  <p style="font-size: 20px;"><b>Hello, ${username}<b></p>
   <p> Your login has been created has an admin!</p>
</div>
<div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
  <p>This is an automated message, please do not reply to this email.</p>
</div>
</body>
</html>
  `;
  return main;
};

module.exports = { 
  loginSessiontemp, 
  adminSessiontemp
};