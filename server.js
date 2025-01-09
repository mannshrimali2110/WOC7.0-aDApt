const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const MongoConnect = require('./Connection/DBConnection')

const apiRoute1 = require('./Routes/apiRoute1');


const PORT = process.env.PORT || 3000;
const app = express();
MongoConnect();

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies or other credentials
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/", apiRoute1);


app.listen(PORT, () => {
    console.log("Port Listening on PORT : " + PORT);
})