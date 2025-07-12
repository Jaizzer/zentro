// Load path to resolve the absolute path to the .env file (one level up from current directory)
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Load models
const File = require("../models/fileModel.js");

// Load services
const storageServices = require("../services/storageServices.js");

// Load utilities
const generateRandomString = require("../utils/generateRandomString.js");

async function saveFiles({ fileUploads, userId, folderId }) {
	// Add hash
	fileUploads.forEach((fileUpload) => {
		fileUpload.hash = generateRandomString();
	});

	// Same the file uploads to the cloud in-parallel
	await Promise.all(
		fileUploads.map((fileUpload) => {
			return storageServices.uploadFile({
				file: fileUpload.file,
				name: fileUpload.hash,
				type: fileUpload.type,
			});
		})
	);

	// Create the files' metadata
	const metadata = fileUploads.map((fileUpload) => ({
		name: fileUpload.name,
		hash: fileUpload.hash,
		type: fileUpload.type,
		size: fileUpload.size,
		ownerId: userId,
		folderId: folderId === "root" ? null : folderId,
	}));

	// Save the file metadata to the database
	await File.createMany(metadata);
}

async function getFiles({ id }) {
	const files = await File.findManyByOptions({ ownerId: id });

	for (const file of files || []) {
		// Attach profile picture url to the file owner
		file.owner.profilePictureUrl = await storageServices.getFileUrl(
			file.owner.profilePictureFilename ||
				process.env.DEFAULT_PROFILE_PICTURE_FILENAME
		);

		// Set the folder name as "My Drive" if the file is not contained by any folder
		if (!file.folder) {
			file.folder = {
				name: "My Vault",
				owner: file.owner,
			};
		}
	}
	return files;
}

module.exports = {
	saveFiles,
	getFiles,
};
