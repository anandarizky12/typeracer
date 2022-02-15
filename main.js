const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const Game = require("./model/Game");

const getRandomWord = require("./randomWord.js");
const app = express();
app.use(cors());

const server = app.listen(5000);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["type-ricer"],
    credentials: true,
  },
});
// mongodb+srv://admin:<password>@cluster0.qql9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.qql9i.mongodb.net/typericer?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongodb");
  }
);
io.on("connect", (socket) => {
  socket.on("join-game", async (data) => {
    try {
      let game = await Game.findById(data.gameId);

      if (game.isOpen) {
        let gameId = game._id.toString();
        socket.join(gameId);
        let player = {
          socketId: socket.id,
          nickname: data.nickname,
        };
        game.players.push(player);
        game = await game.save();

        io.to(gameId).emit("updateGame", game);
      }
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("create-game", async (data) => {
    try {
      const randomWord = await getRandomWord();
      let game = new Game();
      game.words = randomWord;

      let player = {
        socketId: socket.id,
        isLeader: true,
        nickname: data,
      };
      game.players.push(player);
      game = await game.save();

      const gameId = game._id.toString();
      socket.join(gameId);
      io.to(gameId).emit("updateGame", game);
    } catch (err) {
      console.log(err);
    }
  });
});
