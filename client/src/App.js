import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import history from "./History";
import GameMenu from "./components/GameMenu";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import "antd/dist/antd.css";
import socket from "./config";

function App() {
  const [game, setGame] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });

  useEffect(() => {
    socket.on("updateGame", (data) => {
      console.log(data);
      setGame(data);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (game._id !== "") {
      history.push(`/game/${game._id}`);
    }
  }, [game._id]);
  return (
    <div className="App">
      <Router history={history}>
        <Routes>
          <Route exact path="/" element={<GameMenu />} />
          <Route exact path="/createroom" element={<CreateRoom />} />
          <Route exact path="/joinroom" element={<JoinRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
