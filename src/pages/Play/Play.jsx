import { useContext, useMemo, useRef, useState } from "react";
import AppContext from "../../context/app.context";

import Word from "../../components/Word";
import Spinner from "../../components/Spinner";
import CorrectToast from "../../components/CorrectToast";

import "./Play.css";

const scores = {
  2: 500,
  3: 1500,
  4: 2000,
  5: 2500,
  6: 4000,
};

const Play = () => {
  const {
    currentLevel,
    setCurrentLevel,
    levelData,
    setLevelData,
    getLevelData,
    time,
    points,
    setPoints,
    solvedWords,
    setSolvedWords,
  } = useContext(AppContext);
  const wordRefs = useRef([]);
  const [inputBoxes, setInputBoxes] = useState([]);
  const [choices, setChoices] = useState([]);

  const [correctToastIndex, setIsCorrectToastIndex] = useState(null);
  const [isWrongInput, setIsWrongInput] = useState(false);

  const { words } = useMemo(() => {
    if (!levelData) return { words: undefined };

    const [data] = levelData;
    const { words, letters } = data;

    setInputBoxes(Array.from({ length: letters.length }));
    setChoices(letters);

    return { words: words.sort((a, b) => a.length - b.length) };
  }, [levelData]);

  const onChoiceSelect = (index) => {
    if (!choices[index]) return;

    if (solvedWords.length === words.length) return;

    setInputBoxes((prev) => {
      const slotIndex = prev.findIndex((el) => !el);
      let prevCopy = [...prev];

      prevCopy[slotIndex] = choices[index];
      return prevCopy;
    });

    setChoices((prev) => [...prev.filter((_, i) => i !== index)]);
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

    if (solvedWords.includes(input)) {
      onClear();
      return;
    }

    if (words && words.includes(input)) {
      const index = words.findIndex((word) => word === input);
      wordRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      setSolvedWords((prev) => [...prev, inputBoxes.join("")]);

      setPoints((prev) => prev + scores[input.length]);

      setIsCorrectToastIndex(Math.floor(Math.random() * 5) + 1);

      setTimeout(() => setIsCorrectToastIndex(null), 2500);
    } else {
      setIsWrongInput(true);

      setTimeout(() => {
        setIsWrongInput(false);
      }, 1000);
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
    return (
      <main className="play-page">
        <Spinner />
      </main>
    );
  }

  const onTwist = () => {
    setChoices(shuffleArray(choices));
  };

  return (
    <main className="play-page">
      <section className="play-wrapper">
        <section id="side-pannel">
          <h1 className="play-heading">CURRENT LEVEL : {currentLevel}</h1>
          <p className="play-score">SCORE : {points}</p>
          <p className="play-time">TIME : {parseTime(time)}</p>
        </section>

        <section id="words">
          {words.map((word, index) => (
            <Word
              key={word}
              word={word}
              solved={solvedWords.includes(word)}
              ref={(element) => {
                wordRefs.current[index] = element;
              }}
            />
          ))}
        </section>

        <section id="input-boxes">
          {inputBoxes.map((input, index) => (
            <div
              key={`${input}-${index}`}
              className={`input-box ${input ? "fill" : ""} ${
                isWrongInput ? "wrong-input" : ""
              }`}
              onClick={() => {
                onInputSelect(index);
              }}
            >{`${input ?? ""}`}</div>
          ))}
        </section>

        <section id="input-choices">
          {choices.map((letter, index) => (
            <button
              className={`choice-box ${letter ? "fill" : ""}`}
              key={`${letter}-${index}`}
              onClick={() => onChoiceSelect(index)}
              disabled={solvedWords.length === words.length}
            >
              {letter}
            </button>
          ))}
        </section>

        <section id="cta-buttons">
          <button
            className="cta-button generic"
            onClick={onTwist}
            disabled={solvedWords.length === words.length}
          >
            TWIST
          </button>
          <button
            className="cta-button generic"
            onClick={onClear}
            disabled={solvedWords.length === words.length}
          >
            CLEAR
          </button>
          <button
            className="cta-button generic"
            onClick={onUserEnter}
            disabled={solvedWords.length === words.length}
          >
            ENTER
          </button>
        </section>

        {solvedWords.length === words.length && (
          <button className="cta-button proceed" onClick={onProceed}>
            Proceed
          </button>
        )}
      </section>

      {correctToastIndex && <CorrectToast index={correctToastIndex} />}
    </main>
  );
};

export default Play;

function parseTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes < 10 ? `0${minutes}` : minutes} : ${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

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
