export default function downloadUrl(url) {
	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.click();
}
