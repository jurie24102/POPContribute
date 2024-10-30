import {
	useEffect,
	useState,
} from "react";

export default function AutoSlap() {
	const [
		isSlapping,
		setIsSlapping,
	] = useState(false);
	const [
		slapCount,
		setSlapCount,
	] = useState(0);
	const [error, setError] =
		useState(null);

	useEffect(() => {
		let intervalId;

		const startSlapping =
			() => {
				intervalId =
					setInterval(
						async () => {
							try {
								const response =
									await fetch(
										"/api/slap-proxy",
										{
											method:
												"POST",
											headers:
												{
													"Content-Type":
														"application/json",
												},
											body: JSON.stringify(
												{
													country:
														"ZA",
												}
											),
										}
									);

								if (
									response.ok
								) {
									setSlapCount(
										(count) =>
											count +
											1
									);
								} else {
									const errorData =
										await response.json();
									console.error(
										"Failed to slap:",
										response.status,
										errorData
									);
									setError(
										`Error ${
											response.status
										}: ${
											errorData.message ||
											response.statusText
										}`
									);
								}
							} catch (err) {
								console.error(
									"Error making slap request:",
									err
								);
								setError(
									`Error: ${err.message}`
								);
							}
						},
						100
					);
			};

		if (isSlapping) {
			startSlapping();
		} else if (intervalId) {
			clearInterval(
				intervalId
			);
		}

		return () =>
			clearInterval(
				intervalId
			);
	}, [isSlapping]);

	const handleStart = () => {
		setError(null);
		setSlapCount(0);
		setIsSlapping(true);
	};

	const handleStop = () => {
		setIsSlapping(false);
	};

	return (
		<div className="container">
			<h1 className="title">
				Let&apos;s Rank Up!
			</h1>
			<p className="slaps">
				Slaps sent:{" "}
				{slapCount}
			</p>
			{error && (
				<p
					style={{
						color: "red",
					}}>
					{error}
				</p>
			)}
			<button
				className="neumorphism-button"
				onClick={handleStart}
				disabled={isSlapping}>
				{isSlapping
					? "Slapping in Progress..."
					: "Start Slapping"}
			</button>
			<button
				className="neumorphism-button"
				onClick={handleStop}
				disabled={
					!isSlapping
				}>
				Stop Slapping
			</button>
		</div>
	);
}
