const asyncHandler = require("express-async-handler");

async function renderFileUploadPage(req, res, next) {
	return res.status(200).render("uploadFiles", {
		formFieldData: null,
		folderId: "",
	});
}

module.exports = {
	renderFileUploadPage: asyncHandler(renderFileUploadPage),
};
