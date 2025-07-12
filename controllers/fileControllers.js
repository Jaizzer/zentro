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

	await fileServices.saveFiles({
		userId: req.user.id,
		fileUploads: mediaUploads,
		folderId: folderId,
	});

	return res.status(302).redirect("/");
}

async function getFiles(req, res, next) {
	const { page } = req.query;

	// Retrieve the user's files
	const files = await fileServices.getFiles({
		id: req.user.id,
		cursor: page === "next" ? req.session.cursors?.files : undefined,
	});

	// Update the cursor for the next request
	if (files.length !== 0) {
		req.session.cursors = {
			...req.session.cursors,
			files: files[files.length - 1].id,
		};
	}

	// Send the json
	return res.status(200).json({ files, userId: req.user.id });
}

module.exports = {
	renderFileUploadPage: asyncHandler(renderFileUploadPage),
	uploadFiles: asyncHandler(uploadFiles),
	getFiles: asyncHandler(getFiles),
};
