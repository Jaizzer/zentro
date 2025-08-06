import createActionList from "/javascript/utils/createActionList.mjs";
import {
	downloadIcon,
	deleteIcon,
	shareIcon,
	moveIcon,
	seeMoreIcon,
	copyLinkIcon,
} from "/icons/actionIcons.mjs";

export default function createSelectedFilesTabActionList(getSelectedFiles) {
	const shareAction = {
		actionName: "share",
		icon: shareIcon,
		callback: () => {
			console.log(`Sharing file...`);
		},
	};

	const downloadAction = {
		actionName: "download",
		icon: downloadIcon,
		callback: () => {
			const selectedFiles = getSelectedFiles();

			console.log(`Downloading the following files:`);
			for (const selectedFile of selectedFiles || []) {
				console.log(selectedFile.name);
			}
		},
	};

	const moveAction = {
		actionName: "move",
		icon: moveIcon,
		callback: () => {
			console.log(`Moving file...`);
		},
	};

	const deleteAction = {
		actionName: "delete",
		icon: deleteIcon,
		callback: () => {
			console.log(`Deleting file...`);
		},
	};

	const copyLinkAction = {
		actionName: "copyLink",
		icon: copyLinkIcon,
		callback: () => {
			console.log(`Getting the file link...`);
		},
	};

	const seeMoreAction = {
		actionName: "seeMore",
		icon: seeMoreIcon,
		callback: () => {
			console.log(`Opening other actions...`);
		},
	};

	return createActionList([
		shareAction,
		downloadAction,
		moveAction,
		deleteAction,
		copyLinkAction,
		seeMoreAction,
	]);
}
