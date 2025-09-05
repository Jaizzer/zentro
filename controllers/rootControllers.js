const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

// Load services
const fileServices = require("../services/fileServices.js");
const folderServices = require("../services/folderServices.js");

async function handleRootRedirect(req, res, next) {
	// Debugging line
	console.log("Debugging line");

	const username = req.user.username;
	if (!username) {
		// Render the pick username form if the user does not yet have a username
		return res.status(200).redirect("/pick-username");
	} else {
		// Retrieve the user's folders
		const folders = await folderServices.get({ id: req.user.id });

		// Render the feed if the user already has a username
		return res
			.status(200)
			.render("home", { files: null, folders: folders });
	}
}

async function renderPickUsernamePage(req, res, next) {
	const username = req.user.username;
	if (username) {
		// Render the feed if the user already has a username
		return res.status(302).redirect("/");
	} else {
		// Render the pick username form if the user does not yet have a username
		return res.status(200).render("pickUsername", {
			formFieldData: null,
		});
	}
}

async function updateUsername(req, res, next) {
	// Update the user's username
	await User.updateById({
		id: req.user.id,
		data: { username: req.body.username },
	});

	return res.status(302).redirect("/");
}

module.exports = {
	handleRootRedirect: asyncHandler(handleRootRedirect),
	renderPickUsernamePage: asyncHandler(renderPickUsernamePage),
	updateUsername: asyncHandler(updateUsername),
};
