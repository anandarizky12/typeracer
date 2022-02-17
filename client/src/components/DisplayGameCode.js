import { Button } from "antd";
import React, { useRef, useState } from "react";

function DisplayGameCode({ gameId }) {
  const [copy, setCopy] = useState(false);

  const inputRef = useRef();
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand("copy");
    setCopy(true);
  };

  return (
    <div>
      {/* <div></div> */}
      <div>
        <h4>Send This Code to your friends to join the game:</h4>
        <div>
          <input readOnly type="text" ref={inputRef} value={gameId} />
        </div>
        <Button onClick={copyToClipboard}>Copy Code</Button>
      </div>
      <div>{copy ? <p>Success</p> : null}</div>
    </div>
  );
}

export default DisplayGameCode;
