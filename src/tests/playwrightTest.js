// scripts/playwrightTest.js
const {
	chromium,
} = require("playwright");

(async () => {
	const browser =
		await chromium.launch();
	const page =
		await browser.newPage();
	await page.goto(
		"http://localhost:3000"
	);
	console.log(
		"Playwright script executed successfully."
	);
	await browser.close();
})();

// (async () => {
// 	const browser =
// 		await chromium.launch();
// 	const page =
// 		await browser.newPage();

// 	await page.goto(
// 		"http://localhost:3000"
// 	); // Adjust the URL as needed

// 	// Locate the image by its 'src' attribute
// 	const imgElement =
// 		await page.locator(
// 			'img[src="/popcat.webp"]'
// 		);

// 	// Check if the image is found and print confirmation
// 	if (
// 		(await imgElement.count()) >
// 		0
// 	) {
// 		console.log(
// 			"Image element found!"
// 		);
// 	} else {
// 		console.log(
// 			"Image element not found."
// 		);
// 	}

// 	await browser.close();
// })();

module.exports =
	runPlaywrightTest;
