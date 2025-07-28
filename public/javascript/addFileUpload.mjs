import createElement from "/javascript/utils/createElement.mjs";

const fileUploadsPreview = document.querySelector(".fileUploadsPreview");
const uploadFilesOptionButton = document.querySelector("#uploadFilesOption");
const fileUploadsInput = document.querySelector(`#fileUploads`);

uploadFilesOptionButton.addEventListener("click", triggerMediaUploadsInput);

fileUploadsInput.addEventListener("change", updateImageDisplay);

function triggerMediaUploadsInput() {
	fileUploadsInput.click();
}

function updateImageDisplay() {
	// Clear the previous file uploads' preview
	clearElement(fileUploadsPreview);

	// Access the file uploads
	const fileUploads = fileUploadsInput.files;

	// Create the list containing all the file upload previews
	const list = createElement({ tag: "ul" });
	fileUploadsPreview.appendChild(list);

	for (const mediaUpload of fileUploads || []) {
		// Create list item
		const listItem = createElement({ tag: "li" });

		// Create the file upload preview image
		let fileUploadPreview;
		fileUploadPreview = createElement({
			tag: "img",
			attributes: {
				src: URL.createObjectURL(mediaUpload),
				title: mediaUpload.name,
				alt: mediaUpload.name,
			},
		});

		// Put the image inside the list item
		listItem.appendChild(fileUploadPreview);

		list.appendChild(listItem);
	}
}

function clearElement(element) {
	// Clear the previous file uploads' preview
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}
