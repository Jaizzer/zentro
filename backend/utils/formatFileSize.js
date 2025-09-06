function formatFileSize(fileSizeInBytes) {
	let units = ["B", "KB", "MB", "GB", "TB"];
	let index = 0;
	let currentValue = fileSizeInBytes;

	while (currentValue >= 1000) {
		currentValue = currentValue / 1000;
		index++;
	}

	// Round the value to the nearest tenths
	currentValue = Math.round(currentValue * 10) / 10;

	return `${currentValue}${units[index]}`;
}

module.exports = formatFileSize;
