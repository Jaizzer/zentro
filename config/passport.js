// Import path to resolve the absolute path to the .env file (one level up from current directory)
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Import passport dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GithubStrategy = require("passport-github").Strategy;

// Import models
const User = require("../models/userModel.js");
const LocalAccount = require("../models/localAccountModel.js");
const LinkedAccount = require("../models/linkedAccountModel.js");

// Import utilities
const isEmailOrUsername = require("../utils/isEmailOrUsername.js");
const bcrypt = require("bcrypt");

passport.use(
	new LocalStrategy(
		{
			// User email instead of the default username
			usernameField: "emailOrUsername",
			passwordField: "password",
		},
		async function (emailOrUsername, password, done) {
			try {
				// Determine whether the user is trying to sign in with username or email
				const logInMethod = isEmailOrUsername(emailOrUsername);
				const user =
					logInMethod === "email"
						? await User.findByOptions({
								localAccount: {
									email: emailOrUsername,
								},
						  })
						: await User.findByOptions({
								username: emailOrUsername,
						  });

				if (!user) {
					return done(null, false, {
						message: `Incorrect ${logInMethod}`,
					});
				}

				const isPasswordMatched = await bcrypt.compare(
					password,
					user.localAccount.passwordHash || ""
				);

				if (!isPasswordMatched) {
					return done(null, false, { message: "Incorrect password" });
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${
				process.env.NODE_ENVIRONMENT === "PRODUCTION"
					? process.env.PRODUCTION_URL
					: `http://localhost:${process.env.PORT || 5000}`
			}/auth/google/callback`,
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			// Check if the linked account already exists
			let googleAccount =
				await LinkedAccount.getByProviderAndProviderUserId({
					providerIdentity: {
						provider: "Github",
						providerUserId: profile.id,
					},
				});

			// Create a linked account if it not yet exists
			if (!googleAccount) {
				// Check if the gmail is already linked to a local account
				let isGmailAlreadyLinked = await LocalAccount.findByOptions({
					email: profile.email,
				});

				// Send error message if the gmail is already linked to a different account
				if (isGmailAlreadyLinked) {
					return done(
						new Error(
							"This email account is already linked to another account."
						)
					);
				} else {
					// Create a new user to be linked with the Google account
					const newUser = await User.create({
						username: null,
					});

					// Link the newly created user to the newly created Google Account
					googleAccount = await LinkedAccount.create({
						provider: "Google",
						providerUserId: profile.id,
						email: profile.email,
						userId: newUser.id,
					});
				}
			}

			// Retrieve the user linked to the Google account
			let user = await User.findByOptions({ id: googleAccount.userId });

			return done(null, user);
		}
	)
);

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: `${
				process.env.NODE_ENVIRONMENT === "PRODUCTION"
					? process.env.PRODUCTION_URL
					: `http://localhost:${process.env.PORT || 5000}`
			}/auth/github/callback`,
			scope: ["user:email"],
		},
		async function (accessToken, refreshToken, profile, done) {
			// Check if the linked account already exists
			let githubAccount = await LinkedAccount.findByOptions({
				providerIdentity: {
					provider: "Github",
					providerUserId: profile.id,
				},
			});

			// Create a linked account if it not yet exists
			if (!githubAccount) {
				// Create a new user to be linked with the Github account
				const newUser = await User.create({
					username: null,
				});

				// Link the newly created user to the newly created Github Account
				githubAccount = await LinkedAccount.create({
					provider: "Github",
					providerUserId: profile.id,
					userId: newUser.id,
				});
			}

			// Retrieve the user linked to the Github account
			let user = await User.getById(githubAccount.userId);

			return done(null, user);
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByOptions({ id });

		// Prevent null user
		if (!user) {
			return done(new Error("User not found"));
		}

		done(null, user);
	} catch (error) {
		done(error);
	}
});
