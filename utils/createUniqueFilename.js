function createUniqueFilename({ currentFileNames }) {
	// Sort the file names alphanumerically
	const sortedFileNames = currentFileNames.sort((a, b) => a > b);

	// Get the last file name
	const last = sortedFileNames[sortedFileNames.length - 1];

	// Split the file name into its multiple parts
	const [fileName, extension] = last.split(".");
	const [actualName, index] = fileName.split(" - ");

	if (index) {
		// Return the file name with with an index up by 1 from the current last file name
		return `${actualName} - ${parseInt(index) + 1}.${extension}`;
	} else {
		// Return a file name with an index 1
		return `${actualName} - 1.${extension}`;
	}
}

module.exports = createUniqueFilename;
