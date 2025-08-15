const admZip = require("adm-zip");

function zip(files) {
	try {
		const zipper = new admZip();

		// Zip all files together
		files.forEach((file) => {
			// Combine the file name and extension
			const fileNameWithExtension = `${file.name}.${
				file.contentType.split("/")[1]
			}`;

			// Add the file to the zip
			zipper.addFile(fileNameWithExtension, file.buffer);
		});

		const zipFile = zipper.toBuffer();

		return zipFile;
	} catch (error) {
		throw new Error("A problem occurred while zipping the file.");
	}
}

module.exports = zip;
