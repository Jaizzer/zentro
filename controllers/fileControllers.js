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

async function getFilesData(req, res, next) {
	const { page } = req.query;

	// Retrieve the user's files
	const files = await fileServices.getFilesData({
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

	// Check if there's more folders for the succeeding request
	const isNextAvailable =
		(
			await fileServices.getFilesData({
				id: req.user.id,
				cursor: req.session.cursors?.files,
			})
		).length !== 0;

	// Send the json
	return res
		.status(200)
		.json({ files, userId: req.user.id, isNextAvailable });
}

async function getFileUrls(req, res, next) {
	// Parse the hashes
	const fileHashes = req.query.fileHashes.split(",");

	// Retrieve the file urls
	const fileUrls = await fileServices.getFileUrls(fileHashes);
	res.status(200).json({ fileUrls, userId: req.user.id });
}

module.exports = {
	renderFileUploadPage: asyncHandler(renderFileUploadPage),
	uploadFiles: asyncHandler(uploadFiles),
	getFilesData: asyncHandler(getFilesData),
	getFileUrls: asyncHandler(getFileUrls),
};
