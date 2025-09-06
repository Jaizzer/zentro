const { Router } = require("express");
const folderRouter = Router();
const folderControllers = require("../controllers/folderControllers.js");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

folderRouter.get(
	"/retrieve{/:folderId}",
	authMiddlewares.isAuthenticated,
	folderControllers.getFolders
);

folderRouter.get(
	"/:folderId",
	authMiddlewares.isAuthenticated,
	folderControllers.renderInitialFolderPage
);

module.exports = folderRouter;
