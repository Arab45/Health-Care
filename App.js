const express = require("express");
require('dotenv').config();
const { connectToDB } = require("./src/db/index");
const app = express();
const cors = require('cors');
const userRouter = require("./src/router/userRouter");



const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5050']
  };

app.use(cors(corsOptions));


app.use(express.json());
app.use('/api/v1', userRouter);

app.get('/', (req, res) => {
    res.send('welcome.....');
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    // console.log(`http://localhost:${process.env.PORT}`);
    connectToDB();
});