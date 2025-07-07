async function isUnauthenticated(req, res, next) {
	if (req.isUnauthenticated()) {
		return next();
	} else {
		// Redirect the user to the home page if he/she is already authenticated
		return res.status(302).redirect("/");
	}
}

module.exports = {
	isUnauthenticated,
};
