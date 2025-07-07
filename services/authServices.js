// Load models
const LocalAccount = require("../models/localAccountModel.js");
const User = require("../models/userModel.js");

// Load services
const emailServices = require("../services/emailServices.js");

// Load utilities
const bcrypt = require("bcrypt");
const generateRandomString = require("../utils/generateRandomString.js");
const getDateTimeAfterMinutes = require("../utils/getDateTimeAfterMinutes.js");

async function registerLocalUser({ username, email, password }) {
	// Hash the password
	const passwordHash = await bcrypt.hash(password, 12);

	// Generate email verification string
	const emailVerificationString = generateRandomString();

	// Add the new user
	const user = await User.create({
		username: username,
	});

	// Add the new user's account information
	await LocalAccount.create({
		email: email,
		passwordHash: passwordHash,
		emailVerificationString: emailVerificationString,
		emailVerificationStringExpirationDate: getDateTimeAfterMinutes(5),
		isVerified: false,
		userId: user.id,
	});

	await emailServices.sendEmailVerification({
		emailAddress: email,
		emailVerificationString: emailVerificationString,
	});
}

async function verifyUser(emailVerificationString) {
	// Get the local account that  matches the verification string
	const localAccount = await LocalAccount.findByOptions({
		emailVerificationString,
	});

	// Check if the email verification string is usable for user verification
	const isEligibleForVerification =
		localAccount &&
		!localAccount.isVerified &&
		Date.now() < localAccount.emailVerificationStringExpirationDate;

	if (isEligibleForVerification) {
		await LocalAccount.updateById({
			id: localAccount.id,
			data: {
				isVerified: true,
			},
		});
		return {
			success: true,
		};
	} else {
		return {
			success: false,
		};
	}
}

module.exports = {
	registerLocalUser,
	verifyUser,
};
