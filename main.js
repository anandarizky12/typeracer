const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');


const server = app.listen(5000);
const io = socket(server);

mongoose.connect('mongodb://localhost:5000/typeracer', { useNewUrlParser: true , useUnifiedTopology: true }, () => {
                console.log("Connected to mongodb")}    
                );