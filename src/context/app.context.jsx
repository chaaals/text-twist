import { createContext, useState, useEffect } from "react";

import db from "../firebase/firebase-config";
import useAudio from "../hooks/useAudio";
import { collection, getDocs } from "@firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelData, setLevelData] = useState(null);
  const [time, setTime] = useState(600);
  const [timer, setTimer] = useState(undefined);

  const { isPlaying, playAudio } = useAudio("/audio/in-game.mp3");

  const getLevelData = async (currentLevel = 1) => {
    const levelCollectionRef = collection(db, `level-${currentLevel}`);
    const data = await getDocs(levelCollectionRef);
    const index = Math.floor(Math.random() * data.docs.length);

    setLevelData(
      data.docs
        .filter((_, i) => i === index)
        .map((doc) => ({ ...doc.data(), id: doc.id }))
    );

    if (!timer) {
      setTimer(
        setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000)
      );
    }

    if (!isPlaying) {
      playAudio();
    }
  };

  useEffect(() => {
    if (timer && time === 0) {
      clearInterval(timer);
      setTimer(undefined);
    }
  }, [time, timer]);

  return (
    <AppContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        levelData,
        setLevelData,
        getLevelData,
        time,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
