import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FindPlayer } from "./utils/FindPlayer";
import StartButton from "./StartButton";
import socket from "../config";
import CountDown from "./CountDown";
import DisplayWord from "./DisplayWord";

function TypeRicer({ game }) {
  const player = FindPlayer(game.players, socket);

  if (game._id === "") {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="">
      <DisplayWord player={player} word={game.words} />
      <CountDown />
      <StartButton player={player} gameId={game._id} />
    </div>
  );
}

export default TypeRicer;
