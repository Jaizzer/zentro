const { validationResult } = require("express-validator");
const getFormFieldData = require("../utils/getFormFieldData.js");

async function isUnauthenticated(req, res, next) {
	if (req.isUnauthenticated()) {
		return next();
	} else {
		// Redirect the user to the home page if he/she is already authenticated
		return res.status(302).redirect("/");
	}
}

async function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		// Redirect the user to the sign in page if he/she is not yet authenticated
		return res.status(302).redirect("/auth/sign-in");
	}
}

async function validateSignUpForm(req, res, next) {
	const isThereInputErrors = !validationResult(req).isEmpty();
	if (isThereInputErrors) {
		// Rerender the sign up form with error messages
		return res.status(200).render("signUp", {
			formFieldData: getFormFieldData({
				inputValues: req.body,
				inputErrors: validationResult(req).mapped(),
			}),
		});
	} else {
		return next();
	}
}

async function validateResendVerificationLinkForm(req, res, next) {
	const isThereError = !validationResult(req).isEmpty();
	if (isThereError) {
		// Render errors in the form
		return res.status(200).render("resendVerificationLink", {
			formFieldData: getFormFieldData({
				inputValues: req.body,
				inputErrors: validationResult(req).mapped(),
			}),
		});
	} else {
		return next();
	}
}

async function validateSignInForm(req, res, next) {
	const isThereError = !validationResult(req).isEmpty();
	if (isThereError) {
		// Render errors in the form
		return res.status(200).render("signIn", {
			formFieldData: getFormFieldData({
				inputValues: req.body,
				inputErrors: validationResult(req).mapped(),
			}),
		});
	} else {
		return next();
	}
}

module.exports = {
	isUnauthenticated,
	isAuthenticated,
	validateSignUpForm,
	validateResendVerificationLinkForm,
	validateSignInForm,
};
