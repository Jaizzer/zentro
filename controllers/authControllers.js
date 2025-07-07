async function renderSignUpPage(req, res, next) {
	return res.status(200).render("signUp", {
		formFieldData: null,
	});
}

module.exports = {
	renderSignUpPage,
};
