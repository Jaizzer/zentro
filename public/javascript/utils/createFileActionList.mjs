import createActionList from "/javascript/utils/createActionList.mjs";
import renderDownloadPromptPopUp from "/javascript/utils/renderDownloadPromptPopUp.mjs";

export default function createFileActionList(file) {
	const downloadAction = {
		actionName: "download",
		icon: "⬇️",
		callback: () => {
			renderDownloadPromptPopUp(file);
		},
	};

	const renameAction = {
		actionName: "rename",
		icon: "🖋️",
		callback: () => {
			console.log(`Renaming ${file.name}...`);
		},
	};

	const removeFromFavoritesAction = {
		actionName: "removeFromFavorites",
		icon: "⭐️",
		callback: () => {
			console.log(`Removing ${file.name} from favorites...`);
		},
	};

	const addToFavoritesAction = {
		actionName: "addToFavorites",
		icon: "☆",
		callback: () => {
			console.log(`Adding ${file.name} to favorites...`);
		},
	};

	const seeMoreAction = {
		actionName: "seeMore",
		icon: "︙",
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
