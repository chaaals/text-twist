import { useContext } from 'react';
import AppContext from '../../context/app.context';
import './Home.css';

// import db from "../../firebase/firebase-config";
// import { collection, addDoc } from "@firebase/firestore";
// import { LevelOneData, LevelTwoData } from "../../data";
import { Link } from 'react-router-dom';

function Home() {
	// == TODO: Remove this when the app is ready, only use this when we add data to db
	// const add = async () => {
	//   const levelCollectionRef = collection(db, "level-2");

	//   for (const data of LevelTwoData) {
	//     await addDoc(levelCollectionRef, data);
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
