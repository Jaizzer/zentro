import createElement from "/javascript/utils/createElement.mjs";
import createActionList from "/javascript/utils/createActionList.mjs";

export default function createSelectedFilesTab() {
	const selectedFilesTab = createElement({
		tag: "div",
		attributes: {
			className: "selectedFilesTab",
		},
	});

	const closeButton = createElement({
		tag: "button",
		attributes: {
			className: "closeButton",
			innerHTML: "&times;",
		},
		eventListener: {
			event: "click",
			callback: () => {
				selectedFilesTab.parentElement.removeChild(selectedFilesTab);
			},
		},
	});
	selectedFilesTab.appendChild(closeButton);

	const selectedFilesCount = createElement({
		tag: "span",
		attributes: {
			className: "selectedFilesCount",
			textContent: 1,
		},
	});
	selectedFilesTab.appendChild(selectedFilesCount);

	const selectedKeyword = createElement({
		tag: "span",
		attributes: {
			className: "selectedKeyword",
			textContent: "selected",
		},
	});
	selectedFilesTab.appendChild(selectedKeyword);

	// Create the action list
	const actionList = createActionList();
	selectedFilesTab.appendChild(actionList.element);

	// Create rename action
	actionList.addAction({
		actionName: "share",
		icon: "⬆️",
		callback: () => {
			console.log(`Sharing file...`);
		},
	});

	// Create download action
	actionList.addAction({
		actionName: "download",
		icon: "⬇️",
		callback: () => {
			console.log(`Downloading file...`);
		},
	});

	// Create move action
	actionList.addAction({
		actionName: "move",
		icon: "➡️",
		callback: () => {
			console.log(`Moving file...`);
		},
	});

	// Create delete action
	actionList.addAction({
		actionName: "delete",
		icon: "🗑️",
		callback: () => {
			console.log(`Deleting file...`);
		},
	});

	// Create copy link action
	actionList.addAction({
		actionName: "copyLink",
		icon: "🔗",
		callback: () => {
			console.log(`Getting the file link...`);
		},
	});

	// Create see more action
	actionList.addAction({
		actionName: "seeMore",
		icon: "⫶",
		callback: () => {
			console.log(`Opening other actions...`);
		},
	});

	return selectedFilesTab;
}
