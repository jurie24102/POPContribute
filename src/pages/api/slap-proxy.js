export default async function handler(
	req,
	res
) {
	if (req.method === "POST") {
		try {
			const response =
				await fetch(
					"https://www.popcatsolana.xyz/api/slap",
					{
						method: "POST",
						headers: {
							"Content-Type":
								"application/json",
						},
						body: JSON.stringify(
							{
								country: "ZA",
							}
						),
					}
				);

			const data =
				await response.json();
			res
				.status(
					response.status
				)
				.json(data);
		} catch (error) {
			res.status(500).json({
				message:
					"Proxy error",
				error: error.message,
			});
		}
	} else {
		res.setHeader("Allow", [
			"POST",
		]);
		res
			.status(405)
			.end(
				`Method ${req.method} Not Allowed`
			);
	}
}
