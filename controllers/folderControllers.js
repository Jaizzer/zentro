const asyncHandler = require("express-async-handler");
const folderServices = require("../services/folderServices.js");

async function getFolders(req, res, next) {
	const { page } = req.query;

	// Retrieve the user's folders
	const folders = await folderServices.get({
		id: req.user.id,
		cursor: page === "next" ? req.session.cursors?.folders : undefined,
	});

	// Update the cursor for the next request
	if (folders.length !== 0) {
		req.session.cursors = {
			...req.session.cursors,
			folders: folders[folders.length - 1].id,
		};
	}

	// Check if there's more folders for the succeeding request
	const isNextAvailable =
		(
			await folderServices.get({
				id: req.user.id,
				cursor: req.session.cursors?.folders,
			})
		).length !== 0;

	// Send the json
	return res.status(200).json({
		folders,
		isNextAvailable,
	});
}

module.exports = {
	getFolders: asyncHandler(getFolders),
};
