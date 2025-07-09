const asyncHandler = require("express-async-handler");
const fileServices = require("../services/fileServices.js");

async function renderFileUploadPage(req, res, next) {
	return res.status(200).render("uploadFiles", {
		formFieldData: null,
		folderId: "root",
	});
}

async function uploadFiles(req, res, next) {
	const folderId = req.params.folderId;

	// Extract the only necessary file data
	const mediaUploads = req.files.map((file) => ({
		file: file.buffer,
		name: file.originalname,
		type: file.mimetype,
		size: file.size,
	}));

	await fileServices.save({
		userId: req.user.id,
		fileUploads: mediaUploads,
		folderId: folderId,
	});

	return res.status(302).redirect("/");
}

module.exports = {
	renderFileUploadPage: asyncHandler(renderFileUploadPage),
	uploadFiles: asyncHandler(uploadFiles),
};
