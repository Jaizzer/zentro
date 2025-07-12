export default async function getData(url) {
	try {
		// Fetch the folders from the database
		const response = await fetch(url, {
			mode: "cors",
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.error("Failed to retrieve the data. ", error);
	}
}
