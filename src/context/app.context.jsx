import { createContext, useState } from "react";

import db from "../firebase/firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelData, setLevelData] = useState(null);

  const getLevelData = async (currentLevel = 1) => {
    const levelCollectionRef = collection(db, `level-${currentLevel}`);
    const data = await getDocs(levelCollectionRef);
    const index = Math.floor(Math.random() * data.docs.length);

    console.log({ currentLevel });
    setLevelData(
      data.docs
        .filter((_, i) => i === index)
        .map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        levelData,
        setLevelData,
        getLevelData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
