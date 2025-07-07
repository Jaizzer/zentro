const asyncHandler = require("express-async-handler");
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

async function verifyUser(req, res, next) {
	// Extract the email verification string
	const { emailVerificationString } = req.params;

	// Verify a user using the email verification string
	const isVerificationSuccess = (
		await authServices.verifyUser(emailVerificationString)
	).success;

	if (isVerificationSuccess) {
		return res.status(200).render("signUpSuccess");
	} else {
		return res.status(400).render("error", {
			title: "Verification Link Invalid",
			message:
				"This verification link is invalid or has already been used.",
			redirectLink: {
				caption: "Resend Verification Link",
				href: "/auth/resend-verification-link",
			},
		});
	}
}

async function renderResendVerificationLinkPage(req, res, next) {
	return res.status(200).render("resendVerificationLink", {
		formFieldData: null,
	});
}

async function resendVerificationLink(req, res, next) {
	// Resend verification link to the provided email if its associated with an unverified account
	await authServices.resendEmailVerificationLink(req.body.email);

	// Render email verification page
	return res.status(200).render("emailVerificationNotice");
}

module.exports = {
	renderSignUpPage: asyncHandler(renderSignUpPage),
	signUpUser: asyncHandler(signUpUser),
	verifyUser: asyncHandler(verifyUser),
	renderResendVerificationLinkPage: asyncHandler(
		renderResendVerificationLinkPage
	),
	resendVerificationLink: asyncHandler(resendVerificationLink),
};
