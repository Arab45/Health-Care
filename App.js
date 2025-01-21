const express = require("express");
const { connectToDB } = require("./src/db/index");
const app = express();
require('dotenv').config();
const cors = require('cors');



const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
  };

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome.....');
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    connectToDB();
});