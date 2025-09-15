const { Router } = require("express");
const fileRouter = Router();
const fileControllers = require("../controllers/fileControllers");
const fileMiddlewares = require("../middlewares/fileMiddlewares.js");
const fileValidators = require("../validators/fileValidators.js");
const authMiddlewares = require("../middlewares/authMiddlewares.js");
const fileUpload = require("../config/multer.js");

fileRouter.get("/", (req, res) => {
	return res.send("Received a GET HTTP method");
});

fileRouter.post("/:fileId", (req, res) => {
	return res.send("Received a POST HTTP method");
});

fileRouter.put("/:fileId", (req, res) => {
	return res.send("Received a PUT HTTP method");
});

fileRouter.delete("/:fileId", (req, res) => {
	return res.send("Received a DELETE HTTP method");
});

fileRouter.get(
	"/upload",
	authMiddlewares.isAuthenticated,
	fileControllers.renderFileUploadPage
);

fileRouter.post(
	"/upload/:folderId",
	authMiddlewares.isAuthenticated,
	fileUpload.array("fileUploads"),
	fileValidators.uploadFiles,
	fileMiddlewares.validateUploadFilesForm,
	fileControllers.uploadFiles
);

fileRouter.get(
	"/recent",
	authMiddlewares.isAuthenticated,
	fileControllers.getFilesData
);

fileRouter.post(
	"/getZipFile",
	authMiddlewares.isAuthenticated,
	fileControllers.getZipFile
);

module.exports = fileRouter;
