import React from "react";
import { Progress, Typography } from "antd";

const calculatePercentage = (player, wordLength) => {
  if (player.currentWordIndex !== 0) {
    return Math.round((player.currentWordIndex / wordLength) * 100);
  }
  return 0;
};
function ProgressBar({ player, players, wordLength }) {
  const percentage = calculatePercentage(player, wordLength);
  return (
    <div>
      {
        <div>
          <Typography>{player.nickname}</Typography>
          <Progress percent={percentage} />
        </div>
      }
      {players.map((playerObj) => {
        const percentage = calculatePercentage(playerObj, wordLength);
        return playerObj._id !== player._id ? (
          <>
            <div>
              <Typography>{playerObj.nickname}</Typography>
              <Progress percent={percentage} />
            </div>
          </>
        ) : null;
      })}
    </div>
  );
}

export default ProgressBar;
