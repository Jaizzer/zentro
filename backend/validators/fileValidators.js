const { body } = require("express-validator");

const uploadFiles = [
	body("fileUploads").custom((value, { req }) => {
		return true;
	}),
];

module.exports = {
	uploadFiles,
};
