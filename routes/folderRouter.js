const { Router } = require("express");
const folderRouter = Router();
const folderControllers = require("../controllers/folderControllers.js");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

folderRouter.get(
	"/",
	authMiddlewares.isAuthenticated,
	folderControllers.getFolders
);

module.exports = folderRouter;
