// Load path to resolve the absolute path to the .env folder (one level up from current directory)
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Load models
const Folder = require("../models/folderModel.js");

// Load services
const storageServices = require("../services/storageServices.js");

async function getFolders({ id }) {
	const folders = await Folder.findManyByOptions({ ownerId: id });

	for (const folder of folders || []) {
		// Attach profile picture url to the folder owner
		folder.owner.profilePictureUrl = await storageServices.getFileUrl(
			folder.owner.profilePictureFilename ||
				process.env.DEFAULT_PROFILE_PICTURE_FILENAME
		);
	}
	return folders;
}

module.exports = {
	getFolders,
};
