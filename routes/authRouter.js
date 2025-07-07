const { Router } = require("express");
const authRouter = Router();
const authControllers = require("../controllers/authControllers.js");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

authRouter.get(
	"/sign-up",
	authMiddlewares.isUnauthenticated,
	authControllers.renderSignUpPage
);

module.exports = authRouter;
