const { Router } = require("express");
const rootRouter = Router();
const rootControllers = require("../controllers/rootControllers");
const rootMiddlewares = require("../middlewares/rootMiddlewares.js");
const rootValidators = require("../validators/rootValidators.js");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

rootRouter.get(
	"/",
	authMiddlewares.isAuthenticated,
	rootControllers.handleRootRedirect
);
rootRouter.get(
	"/pick-username",
	authMiddlewares.isAuthenticated,
	rootControllers.renderPickUsernamePage
);
rootRouter.post(
	"/pick-username",
	authMiddlewares.isAuthenticated,
	rootValidators.pickUsername,
	rootMiddlewares.validatePickUsernameForm,
	rootControllers.updateUsername
);

module.exports = rootRouter;
