const express = require("express");
const { connectToDB } = require("./src/db/index");
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('welcome.....');
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    connectToDB();
});