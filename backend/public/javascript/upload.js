const uploadFilesForm = document.querySelector(".uploadFilesForm");
const uploadButton = document.querySelector(".uploadButton");

// Access the file input
const fileUploadsInput = document.querySelector(`#fileUploads`);
uploadFilesForm.addEventListener("submit", (e) => {
	// prevent default form submission
	e.preventDefault();

	const formData = new FormData(uploadFilesForm);
	fetch("http://localhost:9000/file/upload", {
		method: "POST",
		body: formData,
	})
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
});

if (uploadFilesForm && uploadButton) {
	uploadButton.addEventListener("click", () => {
		// Disable button prevent resubmissions
		uploadButton.disabled = true;

		// Submit the form
		const submitEvent = new Event("submit");
		uploadFilesForm.dispatchEvent(submitEvent);
	});
}
