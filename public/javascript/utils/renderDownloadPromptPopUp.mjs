import downloadUrl from "/javascript/utils/downloadUrl.mjs";
import createElement from "/javascript/utils/createElement.mjs";
import createPopUp from "/javascript/utils/createPopUp.mjs";

export default function renderDownloadPromptPopUp(file) {
	const popUp = createPopUp();
	const downloadPrompt = createDownloadPrompt(file, popUp.close);
	popUp.append(downloadPrompt);
	document.body.appendChild(popUp.element);
}

function createDownloadPrompt(file, closePopUp) {
	const downloadPrompt = createElement({
		tag: "div",
		attributes: {
			className: "downloadPrompt",
			role: "dialog",
		},
	});

	const downloadPromptHeader = createElement({
		tag: "div",
		attributes: {
			className: "header",
		},
	});
	downloadPrompt.appendChild(downloadPromptHeader);

	const downloadPromptTitle = createElement({
		tag: "h2",
		attributes: {
			textContent: "Download",
		},
	});
	downloadPromptHeader.appendChild(downloadPromptTitle);

	const closeButton = createElement({
		tag: "button",
		attributes: {
			className: "closeButton",
			innerHTML: "&times;",
		},
		eventListener: {
			event: "click",
			callback: (e) => {
				// Remove the popup
				closePopUp();
			},
		},
	});
	downloadPromptHeader.appendChild(closeButton);

	const downloadPromptBody = createElement({
		tag: "div",
		attributes: {
			className: "body",
		},
	});
	downloadPrompt.appendChild(downloadPromptBody);

	const downloadPromptLabel = createElement({
		tag: "p",
		attributes: {
			class: "downloadPromptLabel",
			textContent: "Your about to download:",
		},
	});
	downloadPromptBody.appendChild(downloadPromptLabel);

	const fileInfo = createElement({
		tag: "p",
		attributes: {
			className: "fileInfo",
			textContent: `"${file.name}" (${file.size})`,
		},
	});
	downloadPromptBody.appendChild(fileInfo);

	const downloadPromptFooter = createElement({
		tag: "div",
		attributes: {
			className: "downloadPromptFooter",
		},
	});
	downloadPrompt.appendChild(downloadPromptFooter);

	const cancelButton = createElement({
		tag: "button",
		attributes: {
			className: "cancelButton",
			textContent: "Cancel",
		},
		eventListener: {
			event: "click",
			callback: (e) => {
				// Remove the popup
				closePopUp();
			},
		},
	});
	downloadPromptFooter.appendChild(cancelButton);

	const downloadButton = createElement({
		tag: "button",
		attributes: {
			className: "downloadButton",
			textContent: "Download",
		},
		eventListener: {
			event: "click",
			callback: async (e) => {
				// Remove the popup
				closePopUp();

				downloadUrl(file.url);
			},
		},
	});
	downloadPromptFooter.appendChild(downloadButton);

	return downloadPrompt;
}
