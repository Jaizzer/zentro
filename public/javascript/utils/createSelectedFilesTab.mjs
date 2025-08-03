import createElement from "/javascript/utils/createElement.mjs";
import createSelectedFilesTabActionList from "/javascript/utils/createSelectedFilesTabActionList.mjs";

export default function createSelectedFilesTab() {
	let selectedFiles = [];
	const getSelectedFiles = () => selectedFiles;

	const selectedFilesTab = createElement({
		tag: "div",
		attributes: {
			className: "selectedFilesTab",
			hidden: true,
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
			textContent: 0,
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
	const actionList = createSelectedFilesTabActionList(getSelectedFiles);
	selectedFilesTab.appendChild(actionList);



	};



	const show = () => {
		selectedFilesTab.hidden = false;
	};

	const hide = () => {
		selectedFilesTab.hidden = true;
	};

}
