const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const Game = require("./model/Game");
const dotenv = require("dotenv");
const getRandomWord = require("./randomWord.js");
const app = express();
app.use(cors());
dotenv.config();

const server = app.listen(5000);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["type-ricer"],
    credentials: true,
  },
});

const URI = process.env.DB_URI;
// process.env.NODE_ENV = "production";
mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongodb");
  }
);
io.on("connect", (socket) => {
  socket.on("userInput", async ({ input, gameId }) => {
    try {
      let game = await Game.findById(gameId);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find(
          (player) => player.socketId === socket.id
        );
        let word = game.words[player.currentWordIndex];

        if (input === word) {
          player.currentWordIndex++;
          player.score++;
          if (player.currentWordIndex !== game.words.length) {
            game = await game.save();
            io.to(gameId).emit("updateGame", game);
          } else {
            let endTime = new Date().getTime();
            let { startTime } = game;
            player.WPM = Math.round(
              (player.currentWordIndex / (endTime - startTime)) * 60000
            );
            game = await game.save();
            socket.emit("done");
            io.to(gameId).emit("updateGame", game);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("timer", async ({ gameId, playerId }) => {
    let countDown = 5;
    let game = await Game.findById(gameId);
    let player = game.players.find(
      (player) => player._id.toString() === playerId
    );

    if (player.isLeader) {
      let interval = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameId).emit("timer", { countDown, msg: "Starting Game" });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameId).emit("updateGame", game);
          startGame(gameId);
          clearInterval(interval);
        }
      }, 1000);
    }
  });
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

const startGame = async (gameId) => {
  let game = await Game.findById(gameId);
  game.startTime = new Date().getTime();
  game = await game.save();

  let time = 10;
  let timer = setInterval(async () => {
    if (time >= 0) {
      io.to(gameId).emit("timer", { countDown: time, msg: "Game in Progress" });
      time--;
    } else {
      let endTime = new Date().getTime();
      let game = await Game.findById(gameId);
      let { startTime } = game;
      game.isOver = true;
      game.players.map((player, i) => {
        if (player.WPM === -1) {
          let timeTaken = endTime - startTime;
          let wordsPerMinute = (player.currentWordIndex / timeTaken) * 60000;
          player.WPM = Math.round(wordsPerMinute);
        }
      });
      game = await game.save();
      io.to(gameId).emit("timer", { countDown: 0, msg: "Game Is Over" });
      io.to(gameId).emit("updateGame", game);
      clearInterval(timer);
    }
  }, 1000);
};
