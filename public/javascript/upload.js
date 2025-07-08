const uploadFilesForm = document.querySelector(".uploadFilesForm");
const uploadButton = document.querySelector(".uploadButton");

if (uploadFilesForm && uploadButton) {
	uploadButton.addEventListener("click", () => {
		// Disable button prevent resubmissions
		uploadButton.disabled = true;

		// Submit the form
		uploadFilesForm.submit();
	});
}
