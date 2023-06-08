import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app.context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import "./GameOver.css";

const GameOver = () => {
  const {
    points,
    solvedWords,
    pauseAudio,
    setTime,
    setCurrentLevel,
    setLevelData,
    setSolvedWords,
    setPoints,
    isPlaying,
    toggleAudio,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const onUserRetry = () => {
    navigate("/", { replace: true });
    setTime(600);
    setCurrentLevel(1);
    setPoints(0);
    setLevelData(null);
    setSolvedWords([]);
    pauseAudio();
  };

  return (
    <main className="gameover-page">
      <section className="gameover-wrapper">
        <button className="volume-btn" onClick={toggleAudio}>
          <FontAwesomeIcon icon={isPlaying ? faVolumeMute : faVolumeHigh} />
        </button>

        <h1 className="gameover-heading">Game Over</h1>

        <section className="gop-container">
          <p className="gameover-paragraph">Score : {points}</p>
          <p className="gameover-paragraph">
            Words Solved : {solvedWords.length}
          </p>
        </section>

        <section className="gop-cta">
          <button className="gop-cta-btn" onClick={onUserRetry}>
            Main Menu
          </button>
        </section>
      </section>
    </main>
  );
};

export default GameOver;
