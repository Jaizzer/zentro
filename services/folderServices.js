// Load path to resolve the absolute path to the .env folder (one level up from current directory)
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Load models
const Folder = require("../models/folderModel.js");

// Load services
const storageServices = require("../services/storageServices.js");

async function getFolders({ id, cursor }) {
	const folders = await Folder.findManyByOptions({
		options: { ownerId: id },
		cursor: cursor,
	});

	for (const folder of folders || []) {
		// Attach profile picture url to the folder owner
		folder.owner.profilePictureUrl = await storageServices.getFileUrl(
			folder.owner.profilePictureFilename ||
				process.env.DEFAULT_PROFILE_PICTURE_FILENAME
		);

		// Add property to determine whether the user add the folder to his/her Favorites
		folder.isFavorite =
			folder.favoritedBy?.filter((user) => user.userId === id).length !==
			0;

		// Hide the favorited by property for security purposes
		folder.favoritedBy = undefined;
	}

	return folders;
}

module.exports = {
	getFolders,
};
