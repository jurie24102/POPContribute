// pages/api/auto-click.js
import puppeteer from "puppeteer";

let intervalId;

export default async function handler(
	req,
	res
) {
	if (req.method === "POST") {
		try {
			const browser =
				await puppeteer.launch();

			const page =
				await browser.newPage();

			try {
				await page.goto(
					"https://www.popcatsolana.xyz/",
					{
						timeout: 60000,
						waitUntil:
							"networkidle2",
					}
				);
			} catch (error) {
				console.error(
					"Error loading page:",
					error
				);
				res.status(500).json({
					success: false,
					message:
						"Failed to load target URL.",
				});
				await browser.close();
				return;
			}

			// Click on the top-left corner first (coordinates (0, 0))
			await page.mouse.click(
				0,
				0
			);
			console.log(
				"Clicked on the corner of the page!"
			);

			// Define a function to repeatedly click the target element
			const clickElementRepeatedly =
				async () => {
					const element =
						await page.$(
							'img[src="/popcat.webp"]'
						); // Selector based on your screenshot
					if (element) {
						await element.click();
						console.log(
							"Element clicked!"
						);
					} else {
						console.log(
							"Element not found"
						);
					}
				};

			// Set interval to click every 1 second
			intervalId =
				setInterval(
					clickElementRepeatedly,
					500
				); // 0.01 second interval

			// End the process when the request is closed
			req.on(
				"close",
				async () => {
					clearInterval(
						intervalId
					);
					await browser.close();
				}
			);

			res.status(200).json({
				success: true,
				message:
					"Started clicking every 1 second after initial corner click.",
			});
		} catch (error) {
			console.error(
				"Error in Puppeteer script:",
				error
			);
			res.status(500).json({
				success: false,
				message:
					"Error in Puppeteer script.",
			});
		}
	} else if (
		req.method === "DELETE"
	) {
		// Endpoint to stop the process
		clearInterval(intervalId);
		res.status(200).json({
			success: true,
			message:
				"Stopped clicking process.",
		});
	} else {
		res.setHeader("Allow", [
			"POST",
			"DELETE",
		]);
		res
			.status(405)
			.end(
				`Method ${req.method} Not Allowed`
			);
	}
}
