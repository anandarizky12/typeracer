const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');
const game = require('./model/Game');
const getRandomWord = require('./randomWord.js');


const server = app.listen(5000);
const io = socket(server);

console.log(getRandomWord())
mongoose.connect('mongodb://localhost:5000/typeracer', { useNewUrlParser: true , useUnifiedTopology: true }, () => {
                console.log("Connected to mongodb")}    
                );