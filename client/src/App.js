import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import history from "./History";
import GameMenu from "./components/GameMenu";
import TypeRicer from "./components/TypeRicer";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import "antd/dist/antd.css";
import socket from "./config";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });

  useEffect(() => {
    socket.on("updateGame", (data) => {
      console.log("updateGame", data);
      setGame(data);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (game._id !== "") {
      navigate(`/game/${game._id}`);
    }
  }, [game._id]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GameMenu />} />
        <Route exact path="/createroom" element={<CreateRoom />} />
        <Route exact path="/joinroom" element={<JoinRoom />} />
        <Route path="/game/:gameId" element={<TypeRicer game={game} />} />
      </Routes>
    </div>
  );
}

export default App;
