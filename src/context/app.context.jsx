import { createContext, useState, useEffect } from 'react';

import db from '../firebase/firebase-config';
import { collection, getDocs } from '@firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [currentLevel, setCurrentLevel] = useState(1);
	const [levelData, setLevelData] = useState(null);
	const [time, setTime] = useState(3);
	const [timer, setTimer] = useState(undefined);

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

		// loob ng get level data
		setTimer(
			setInterval(() => {
				setTime((prev) => prev - 1);
			}, 1000)
		);
	};

	// after getLevelData
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
