const authServices = require("../services/authServices.js");

async function renderSignUpPage(req, res, next) {
	return res.status(200).render("signUp", {
		formFieldData: null,
	});
}

async function signUpUser(req, res, next) {
	// Register the user
	await authServices.registerLocalUser({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	});

	// Render sign up success messages
	return res.status(200).render("emailVerificationNotice");
}

module.exports = {
	renderSignUpPage,
	signUpUser,
};
