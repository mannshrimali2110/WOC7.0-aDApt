const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const apiRoute1 = require('./Routes/apiRoute1');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiRoute1);

app.listen(PORT, () => {
    console.log("Port Listening on PORT : " + PORT);
})