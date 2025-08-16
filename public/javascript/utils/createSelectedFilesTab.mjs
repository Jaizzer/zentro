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

	const updateSelectedFileCount = (newFileCount) => {
		selectedFilesCount.textContent = newFileCount;
	};

	const addFile = (fileToAdd) => {
		const isFileAlreadyAdded =
			selectedFiles.filter((file) => file.hash === fileToAdd.hash)
				.length !== 0;
		if (!isFileAlreadyAdded) {
			selectedFiles.push(fileToAdd);
		}

		updateSelectedFileCount(selectedFiles.length);
	};

	const removeFile = (fileToRemove) => {
		const isFileAlreadyAdded =
			selectedFiles.filter((file) => file.hash === fileToRemove.hash)
				.length !== 0;

		if (isFileAlreadyAdded) {
			selectedFiles = selectedFiles.filter(
				(file) => file.hash === fileToRemove.hash
			);
		}
		updateSelectedFileCount(selectedFiles.length);
	};

	const show = () => {
		selectedFilesTab.hidden = false;
	};

	const hide = () => {
		selectedFilesTab.hidden = true;
	};

	return { html: selectedFilesTab, addFile, removeFile, show, hide };
}
