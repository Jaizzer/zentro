// Import path to resolve the absolute path to the .env file (one level up from current directory)
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Load services
const storageServices = require("../services/storageServices.js");

async function attachUserProfileData(req, res, next) {
	try {
		if (!req.user) {
			return next();
		}

		// Attach the profile picture url to the user
		req.user.profilePictureFilename =
			req.user.profilePictureFilename ||
			process.env.DEFAULT_PROFILE_PICTURE_FILENAME;
		req.user.profilePictureUrl = await storageServices.getFileUrl(
			req.user.profilePictureFilename
		);

		// Make user accessible to all views
		res.locals.user = req.user;

		return next();
	} catch (error) {
		console.error("Failed to attach user profile data. ", error);
		next(error);
	}
}

module.exports = {
	attachUserProfileData,
};
