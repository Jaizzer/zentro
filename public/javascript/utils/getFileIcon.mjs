import fileIcons from "/icons/fileIcons.mjs";

export default function getFileIcon(fileType) {
	// Normalize the input to lowercase to make it case-insensitive (optional)
	const type = fileType.toLowerCase();
	return fileIcons[type] || fileIcons.unknownFileIcon;
}
