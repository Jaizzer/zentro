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

// Use ejs layout for reusable html layouts
const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);

// Place all javascript at the end of the HTML body to support view-specific scripts in layouts
app.set("layout extractScripts", true);

// Setup views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
