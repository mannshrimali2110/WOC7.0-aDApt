const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const MongoConnect = require('./Connection/DBConnection')
const apiRoute1 = require('./Routes/apiRoute1');

const PORT = process.env.PORT || 3000;
const app = express();
MongoConnect();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = new socketIO.Server(server,{
    cors: process.env.FRONTEND_URL,
    methods:["GET", "POST"],
    credentials:true
});

app.use("/api/", apiRoute1);

io.on('connection',(socket)=>{
    console.log("User Connected : " , socket.id);
    // socket.emit('welcome',`Welcome by Backend : ${socket.id}`);
    // socket.broadcast.emit('welcome',`${socket.id} user joined the Server`);
    socket.on("disconnect",()=>{
        console.log("User Disconnected :  ", socket.id); 
    });

    socket.on("message",(data)=>{
        console.log(data);
        socket.broadcast.emit("message",data);
    })
})


server.listen(PORT, () => {
    console.log("Port Listening on PORT : " + PORT);
})