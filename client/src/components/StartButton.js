import React, { useState } from "react";
import socket from "../config";
import Button from "antd/lib/button";

function StartButton({ player, gameId }) {
  const [button, setButton] = useState(true);
  const { isLeader } = player;

  console.log("isLeader", isLeader);
  isLeader;
  const handleClick = (e) => {
    socket.emit("timer", { playerId: player._id, gameId });
    setButton(false);
  };

  return (
    <div>
      {isLeader && button ? <Button onClick={handleClick}>Start</Button> : null}
    </div>
  );
}

export default StartButton;
