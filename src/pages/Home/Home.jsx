import { useContext } from 'react';
import AppContext from '../../context/app.context';
import './Home.css';

// import db from "../../firebase/firebase-config";
// import { collection, addDoc } from "@firebase/firestore";
// import {
//   LevelOneData,
//   LevelTwoData,
//   LevelThreeData,
//   LevelFourData,
//   LevelFiveData,
// } from "../../data";
import { Link } from 'react-router-dom';

function Home() {
	// == TODO: Remove this when the app is ready, only use this when we add data to db
	// const levelData = {
	//   1: LevelOneData,
	//   2: LevelTwoData,
	//   3: LevelThreeData,
	//   4: LevelFourData,
	//   5: LevelFiveData,
	// };

	// const add = async () => {
	//   for (let i = 1; i <= 5; i++) {
	//     const levelCollectionRef = collection(db, `level-${i}`);

	//     for (const data of levelData[i]) {
	//       await addDoc(levelCollectionRef, data);
	//     }
	//   }
	// };

	const { getLevelData } = useContext(AppContext);

	return (
		<main>
			<h1>Text Twist Game</h1>

			<button>
				<Link to="/play" onClick={() => getLevelData()}>
					Play
				</Link>
			</button>

			{/* <button onClick={add}>Add Data</button> */}
		</main>
	);
}

export default Home;
