export default function downloadUrl({ url, fileName }) {
	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = fileName || "download";
	downloadLink.click();
}
