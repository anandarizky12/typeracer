import React from "react";

const correct = {
  backgroundColor: "#34eb77",
};
const getTypedWords = (player, word) => {
  let typedWords = word.slice(0, player.currentWordIndex);
  typedWords = typedWords.join(" ");
  return <span style={correct}>{typedWords}</span>;
};

const currentWord = {
  textDecoration: "underline",
};
const getCurrentWord = (player, word) => {
  return <span style={currentWord}>{word[player.currentWordIndex]}&nbsp;</span>;
};

const getWordsToType = (player, word) => {
  let wordsTyped = word.slice(player.currentWordIndex + 1, word.length);
  wordsTyped = wordsTyped.join(" ");
  return <span>{wordsTyped}</span>;
};

function DisplayWord({ player, word }) {
  console.log(word);
  return (
    <div>
      {getTypedWords(player, word)}
      {getCurrentWord(player, word)}
      {getWordsToType(player, word)}
    </div>
  );
}

export default DisplayWord;
