const express = require("express");
require('dotenv').config();
const { connectToDB } = require("./src/db/index");
const app = express();
const cors = require('cors');
const userRouter = require("./src/router/userRouter");
const providerRouter = require('./src/router/providerRouter');
const recaptchaRouter = require('./src/router/recapchaRouter');
const paystackRouter = require('./src/router/paystackRouter');
const adminRouter = require('./src/router/adminRouter');
const appointmentRouter = require('./src/router/appointmentRouter');
const feedbackRouter = require('./src/router/feedbackRouter');


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5050']
  };

app.use(cors(corsOptions));


app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1', providerRouter);
app.use('/api/v1', recaptchaRouter);
app.use(paystackRouter);
app.use('/Admin', adminRouter);
app.use('/appointment', appointmentRouter);
app.use('/feedback', feedbackRouter);



app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    connectToDB();
});