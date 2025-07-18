// Load the environment variables
const dotenv = require("dotenv");
dotenv.config();

// Load path module for file and directory path
const path = require("path");

// Setup the server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
	if (error) {
		console.error(`Failed to start server: ${error}`);
	} else {
		const baseUrl =
			process.env.NODE_ENVIRONMENT === "PRODUCTION"
				? process.env.PRODUCTION_URL
				: `http://localhost:${PORT}`;
		console.log(`Server is listening on: ${baseUrl}`);
	}
});

// Load connect-flash to store messages for page redirects
const flash = require("connect-flash");
app.use(flash());

// Encode data into key-value pairs
app.use(express.urlencoded({ extended: true }));

// Serve public files (e.g. css, javascript)
app.use(express.static(path.join(__dirname, "public")));

// Use ejs layout for reusable html layouts
const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);

// Place all javascript at the end of the HTML body to support view-specific scripts in layouts
app.set("layout extractScripts", true);

// Setup views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Apply session middleware to handle user sessions (e.g., login state, cookies)
const sessionMiddleware = require("./config/session.js");
app.use(sessionMiddleware);

// Load passport for user authentication
const passport = require("passport");

// Load and configure the Passport strategies
require("./config/passport.js");

// Initialize Passport and enable session-based authentication
app.use((req, res, next) => {
	passport.initialize()(req, res, next);
});
app.use((req, res, next) => {
	passport.session()(req, res, next);
});

// Make the user data available in every views
const userMiddlewares = require("./middlewares/userMiddlewares.js");
app.use(userMiddlewares.attachUserProfileData);

// Root router
const rootRouter = require("./routes/rootRouter");
app.use("/", rootRouter);

// Authentication router
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

// File router
const fileRouter = require("./routes/fileRouter");
app.use("/file", fileRouter);

// Folder router
const folderRouter = require("./routes/folderRouter");
app.use("/folder", folderRouter);

// Main error-handling middleware
app.use((error, req, res, next) => {
	console.error(error.stack);
	const statusCode = error.statusCode || error.status || 500;
	const message = error.message || "Internal server error";
	console.log(message);
	res.status(statusCode).render("error", {
		title: "404 Error",
		message: "Internal Server Error",
		redirectLink: null,
	});
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
	console.error(`Uncaught exception: ${error}`);
	process.exit(1);
});
