const { Router } = require("express");
const fileRouter = Router();
const fileControllers = require("../controllers/fileControllers");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

fileRouter.get(
	"/upload",
	authMiddlewares.isAuthenticated,
	fileControllers.renderFileUploadPage
);

module.exports = fileRouter;
