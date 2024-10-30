// // pages/index.js
// import { useState } from "react";

// export default function Home() {
// 	const [
// 		isClicking,
// 		setIsClicking,
// 	] = useState(false);

// 	const startClicking =
// 		async () => {
// 			try {
// 				const response =
// 					await fetch(
// 						"/api/auto-click",
// 						{ method: "POST" }
// 					);
// 				const data =
// 					await response.json();
// 				if (data.success) {
// 					setIsClicking(true);
// 				} else {
// 					console.error(
// 						data.message
// 					);
// 				}
// 			} catch (error) {
// 				console.error(
// 					"Failed to start clicking process",
// 					error
// 				);
// 			}
// 		};

// 	const stopClicking =
// 		async () => {
// 			try {
// 				const response =
// 					await fetch(
// 						"/api/auto-click",
// 						{
// 							method:
// 								"DELETE",
// 						}
// 					);
// 				const data =
// 					await response.json();
// 				if (data.success) {
// 					setIsClicking(
// 						false
// 					);
// 				} else {
// 					console.error(
// 						data.message
// 					);
// 				}
// 			} catch (error) {
// 				console.error(
// 					"Failed to stop clicking process",
// 					error
// 				);
// 			}
// 		};

// 	return (
// 		<div>
// 			<h1>
// 				Lett&apos;s Rank Up!
// 			</h1>
// 			<button
// 				onClick={
// 					startClicking
// 				}
// 				disabled={isClicking}>
// 				{isClicking
// 					? "Clicking in Progress..."
// 					: "Start Clicking"}
// 			</button>
// 		</div>
// 	);
// }

// pages/index.js
import { useState } from "react";

export default function Home() {
	const [
		isClicking,
		setIsClicking,
	] = useState(false);

	const startClicking =
		async () => {
			try {
				const response =
					await fetch(
						"/api/auto-click",
						{ method: "POST" }
					);
				const data =
					await response.json();
				if (data.success) {
					setIsClicking(true);
				} else {
					console.error(
						data.message
					);
				}
			} catch (error) {
				console.error(
					"Failed to start clicking process",
					error
				);
			}
		};

	const stopClicking =
		async () => {
			try {
				const response =
					await fetch(
						"/api/auto-click",
						{
							method:
								"DELETE",
						}
					);
				const data =
					await response.json();
				if (data.success) {
					setIsClicking(
						false
					);
				} else {
					console.error(
						data.message
					);
				}
			} catch (error) {
				console.error(
					"Failed to stop clicking process",
					error
				);
			}
		};

	return (
		<div className="container">
			<h1 className="title">
				Let&apos;s Rank Up!
			</h1>
			<button
				onClick={
					startClicking
				}
				disabled={isClicking}
				className="neumorphism-button">
				{isClicking
					? "Contribution in Progress..."
					: "Start Contribution"}
			</button>
		</div>
	);
}
