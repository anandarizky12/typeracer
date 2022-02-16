import React from "react";


const getTypedWords = (player, word) => {
    let typedWords = word.slice(0, player.currentWordIndex);
    typedWords = typedWords.join(" ");
    return <span style={correct}>{typedWords}</span>;
};

const getCurrentWord = (player, word) => {
    return <span style= />
}
function DisplayWord({ player, word }) {
  return <div>
      {getTypedWords(player, word)}
      {getCurrentWord(player, word)}
      </div>;
}

export default DisplayWord;
