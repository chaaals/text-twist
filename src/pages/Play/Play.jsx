import { useContext, useMemo, useState } from "react";
import AppContext from "../../context/app.context";

import "./Play.css";

const Play = () => {
  const {
    currentLevel,
    setCurrentLevel,
    levelData,
    setLevelData,
    getLevelData,
  } = useContext(AppContext);
  const [inputBoxes, setInputBoxes] = useState([]);
  const [choices, setChoices] = useState([]);
  const [solvedWords, setSolvedWords] = useState([]);

  const { words } = useMemo(() => {
    if (!levelData) return { words: undefined };

    const [data] = levelData;
    const { words, letters } = data;

    setInputBoxes(Array.from({ length: letters.length }));
    setChoices(letters);

    return { words: words.sort((a, b) => a.length - b.length) };
  }, [levelData]);

  const onChoiceSelect = (index) => {
    if (solvedWords.length === words.length) return;

    setInputBoxes((prev) => {
      const slotIndex = prev.findIndex((el) => !el);
      let prevCopy = [...prev];

      prevCopy[slotIndex] = choices[index];
      return prevCopy;
    });

    setChoices((prev) => prev.filter((_, i) => i !== index));
  };

  const onInputSelect = (index) => {
    if (!inputBoxes[index]) return;

    setChoices((prev) => [...prev, inputBoxes[index]]);

    setInputBoxes((prev) => {
      const filteredInputBoxes = prev.filter((_, i) => i !== index);

      return [...filteredInputBoxes, undefined];
    });
  };

  const onClear = () => {
    if (inputBoxes.every((el) => el === undefined)) return;

    const userInputs = inputBoxes.filter((el) => el !== undefined);
    setInputBoxes((prev) => prev.map(() => undefined));
    setChoices((prev) => [...prev, ...userInputs]);
  };

  const onUserEnter = () => {
    const input = inputBoxes.join("");
    if (solvedWords.length === words.length) return;

    if (solvedWords.includes(input)) return; //

    if (words && words.includes(input)) {
      setSolvedWords((prev) => [...prev, inputBoxes.join("")]);
    } else {
      console.log("ngek");
    }

    onClear();
  };

  const onProceed = () => {
    setSolvedWords([]);
    setCurrentLevel((prev) => prev + 1);
    setLevelData(null);
    getLevelData(currentLevel + 1);
  };

  if (!levelData) {
    return <h1>Loading...</h1>;
  }

  const onTwist = () => {
    setChoices(shuffleArray(choices));
  };

  return (
    <main>
      <h1>Current Level: {currentLevel}</h1>

      <section id="words">
        {words.map((word) => (
          <p
            key={word}
            className={`${solvedWords.includes(word) ? "solved" : ""}`}
          >
            {word}
          </p>
        ))}
      </section>

      <section id="input-boxes">
        {inputBoxes.map((input, index) => (
          <div
            key={`${input}-${index}`}
            className="input-box"
            onClick={() => onInputSelect(index)}
          >{`${input ?? ""}`}</div>
        ))}
      </section>

      <section id="input-choices">
        {choices.map((letter, index) => (
          <button
            key={`${letter}-${index}`}
            onClick={() => onChoiceSelect(index)}
          >
            {letter}
          </button>
        ))}
      </section>

      <section id="cta-buttons">
        <button onClick={onTwist}>Twist</button>
        <button onClick={onClear}>Clear</button>
        <button onClick={onUserEnter}>Enter</button>
        {solvedWords.length === words.length && (
          <button onClick={onProceed}>Proceed</button>
        )}
      </section>
    </main>
  );
};

export default Play;

function shuffleArray(array) {
  let copy = [...array];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
