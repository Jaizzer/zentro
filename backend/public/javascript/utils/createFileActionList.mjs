import createActionList from "./createActionList.mjs";
import renderDownloadPromptPopUp from "./renderDownloadPromptPopUp.mjs";
import {
	downloadIcon,
	editIcon,
	addToFavoritesIcon,
	removeFromFavoritesIcon,
	seeMoreIcon,
} from "../../icons/actionIcons.mjs";

export default function createFileActionList(file) {
	const downloadAction = {
		actionName: "download",
		icon: downloadIcon,
		callback: () => {
			renderDownloadPromptPopUp(file);
		},
	};

	const renameAction = {
		actionName: "rename",
		icon: editIcon,
		callback: () => {
			console.log(`Renaming ${file.name}...`);
		},
	};

	const removeFromFavoritesAction = {
		actionName: "removeFromFavorites",
		icon: removeFromFavoritesIcon,
		callback: () => {
			console.log(`Removing ${file.name} from favorites...`);
		},
	};

	const addToFavoritesAction = {
		actionName: "addToFavorites",
		icon: addToFavoritesIcon,
		callback: () => {
			console.log(`Adding ${file.name} to favorites...`);
		},
	};

	const seeMoreAction = {
		actionName: "seeMore",
		icon: seeMoreIcon,
		callback: () => {
			console.log(`Opening other actions...`);
		},
	};

	const fileActionList = createActionList([
		downloadAction,
		renameAction,
		file.isFavorite ? removeFromFavoritesAction : addToFavoritesAction,
		seeMoreAction,
	]);

	return fileActionList;
}
