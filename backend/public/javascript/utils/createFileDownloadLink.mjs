export default function createFileDownloadLink(file) {
	// Ensure that the file content is converted to Uint8Array
	const data = Uint8Array.from(file.content.data);

	// Convert the data into Blob for convenient download operation
	const content = new Blob([data.buffer], { type: file.contentType });

	// Create a file download link
	const fileDownloadLink = window.URL.createObjectURL(content);

	return fileDownloadLink;
}
