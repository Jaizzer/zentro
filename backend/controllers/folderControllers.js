const asyncHandler = require("express-async-handler");
const folderServices = require("../services/folderServices.js");

async function getFolders(req, res, next) {
	const { page } = req.query;

	const { folderId } = req.params;

	// Retrieve the user's folders
	const folders = await folderServices.get({
		userId: req.user.id,
		folderId,
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

async function renderInitialFolderPage(req, res, next) {
	const username = req.user.username;
	const { folderId } = req.params;

	if (!username) {
		// Render the pick username form if the user does not yet have a username
		return res.status(200).redirect("/pick-username");
	} else {
		// Retrieve the folder
		const folder = await folderServices.get({
			userId: req.user.id,
			folderId,
		});

		if (folder.length !== 0) {
			// Render the folder if it exists
			return res
				.status(200)
				.render("folder", { folder: JSON.stringify(folder) });
		} else {
			// Render error if the folder does not exists
			return res.status(404).render("error", {
				title: "404 Error",
				message: "Folder unavailable",
				redirectLink: { caption: "Go Back", href: "/" },
			});
		}
	}
}

module.exports = {
	getFolders: asyncHandler(getFolders),
	renderInitialFolderPage: asyncHandler(renderInitialFolderPage),
};
