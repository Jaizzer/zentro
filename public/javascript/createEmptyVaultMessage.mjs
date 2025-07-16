import createElement from "/javascript/utils/createElement.mjs";

export default function createEmptyVaultMessage() {
	const emptyVaultMessage = createElement({
		tag: "section",
		attributes: {
			className: "blankDriveMessage",
		},
	});

	const iconContainer = createElement({
		tag: "span",
		attributes: {
			className: "iconContainer",
			innerHTML: "🦜",
		},
	});
	emptyVaultMessage.appendChild(iconContainer);

	const heading = createElement({
		tag: "h2",
		attributes: {
			textContent: "Nothing here yet!",
		},
	});
	emptyVaultMessage.appendChild(heading);

	const message = createElement({
		tag: "p",
		attributes: {
			textContent:
				"Start by uploading your first file or organizing with folders.",
		},
	});
	emptyVaultMessage.appendChild(message);

	return emptyVaultMessage;
}
