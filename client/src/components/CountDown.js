import React, { useState, useEffect } from "react";
import socket from "../config";
import Countdown from "antd/lib/statistic/Countdown";
import { Typography } from "antd";

function CountDown() {
  const [count, setCount] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    socket.on("timer", (data) => {
      setCount(data);
    });
    socket.on("done", () => {
      socket.removeListeners("timer");
    });
  }, []);

  console.log("count", count);

  return (
    <div>
      {count.countDown !== "" && <Typography>{count.countDown}</Typography>}
      <Typography>{count.msg}</Typography>
    </div>
  );
}

export default CountDown;
