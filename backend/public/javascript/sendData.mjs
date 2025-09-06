export default async function sendData({ url, data }) {
	try {
		// Fetch the folders from the database
		const response = await fetch(url, {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.error("Failed to send the data. ", error);
	}
}
