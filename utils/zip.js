const admZip = require("adm-zip");

function zip(files) {
	try {
		const zipper = new admZip();

		// Zip all files together
		files.forEach((file) => {
			zipper.addFile(file.name, file.buffer);
		});

		const zipFile = zipper.toBuffer();

		return zipFile;
	} catch (error) {
		throw new Error("A problem occurred while zipping the file.");
	}
}

module.exports = zip;
