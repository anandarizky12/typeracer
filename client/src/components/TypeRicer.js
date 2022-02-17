import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FindPlayer } from "./utils/FindPlayer";
import StartButton from "./StartButton";
import socket from "../config";
import CountDown from "./CountDown";
import DisplayWord from "./DisplayWord";
import TypeUser from "./TypeUser";
import ProgressBar from "./ProgressBar";
import Score from "./Score";
import DisplayGameCode from "./DisplayGameCode";

function TypeRicer({ game }) {
  const player = FindPlayer(game.players, socket);

  if (game._id === "") {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="">
      <ProgressBar
        player={player}
        wordLength={game.words.length}
        players={game.players}
      />
      <DisplayWord player={player} word={game.words} />
      <TypeUser isOpen={game.isOpen} isOver={game.isOver} gameId={game._id} />
      <CountDown />
      <StartButton player={player} gameId={game._id} />
      {game.isOpen ? <DisplayGameCode gameId={game._id} /> : null}
      <Score players={game.players} />
    </div>
  );
}

export default TypeRicer;
