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
    if (words && words.includes(inputBoxes.join(""))) {
      setSolvedWords((prev) => [...prev, inputBoxes.join("")]);
    } else {
      console.log("ngek");
    }

    onClear();
  };

  const onProceed = () => {
    if (currentLevel === 2) return; // temporary, remove this when level 3 - 5 has data

    setSolvedWords([]);
    setCurrentLevel((prev) => prev + 1);
    setLevelData(null);
    getLevelData(currentLevel + 1);
  };

  if (!levelData) {
    return <h1>Loading...</h1>;
  }

  console.log({ inputBoxes, choices, solvedWords });
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
        {/* <button>Twist</button> // to be implemented later */}
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
