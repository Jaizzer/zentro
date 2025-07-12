// Render the initial fields
renderInitialFiles();

const viewMoreFilesButton = document.querySelector(
	".filesContainer .viewMoreButton"
);

viewMoreFilesButton.addEventListener("click", async () => {
	const url = "http://localhost:9000/file/recent?page=next";

	// Fetch the files
	const { files, userId } = await requestFiles(url);

	renderFiles({ files, userId });
});

// Fetch the files from the database
async function requestFiles(url) {
	try {
		const response = await fetch(url, {
			mode: "cors",
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.error("Failed to retrieve the files. ", error);
	}
}

async function renderInitialFiles() {
	const url = "http://localhost:9000/file/recent";
	const files = await requestFiles(url);
	renderFiles(files);
}

function renderFiles({ files, userId }) {
	const filesContainer = document.querySelector(".filesContainer");

	for (const file of files || []) {
		// Create main file metadata container
		const fileDiv = document.createElement("div");
		fileDiv.classList.add("file");
		filesContainer.appendChild(fileDiv);

		// Create file label
		const fileLabel = document.createElement("div");
		fileLabel.classList.add("label");
		fileDiv.appendChild(fileLabel);

		// Create file icon
		const fileIconContainer = document.createElement("span");
		fileIconContainer.classList.add("iconContainer");
		fileIconContainer.innerHTML = getFileIcon(file.type);
		fileLabel.appendChild(fileIconContainer);

		// Create filename
		const filename = document.createElement("span");
		filename.classList.add("name");
		filename.textContent = file.name;
		fileLabel.appendChild(filename);

		// Create file creation date
		const creationDate = document.createElement("time");
		creationDate.dateTime = new Date(file.createdAt);
		creationDate.classList.add("creationDate");
		creationDate.textContent = new Date(file.createdAt).toDateString();
		fileDiv.appendChild(creationDate);

		// Create file owner information
		const owner = document.createElement("div");
		owner.classList.add("owner");
		fileDiv.appendChild(owner);

		const ownerProfilePicture = document.createElement("img");
		ownerProfilePicture.classList.add("profilePicture");
		ownerProfilePicture.src = file.owner.profilePictureUrl;
		owner.appendChild(ownerProfilePicture);

		const ownerUsername = document.createElement("span");
		ownerUsername.classList.add("ownerUsername");
		ownerUsername.textContent = `${
			file.owner.id === userId ? "You" : file.owner.username
		}`;
		owner.appendChild(ownerUsername);

		// Create file location information
		const location = document.createElement("div");
		location.classList.add("location");
		fileDiv.appendChild(location);

		const folderIconContainer = document.createElement("span");
		folderIconContainer.classList.add("iconContainer");
		folderIconContainer.innerHTML = getFolderIcon(file.owner.id === userId);
		location.appendChild(folderIconContainer);

		const folderName = document.createElement("span");
		folderName.classList.add("name");
		folderName.textContent =
			file.owner.id === userId ? file.folder?.name : "Shared with You";
		location.appendChild(folderName);

		// Create file actions (e.g. Download, Rename, Favorite, Unfavorite, More)
		const actions = document.createElement("ul");
		actions.classList.add("actions");
		fileDiv.appendChild(actions);

		// Create download action
		const downloadAction = createAction({
			actionName: "download",
			icon: getActionIcon("download"),
			callback: () => {
				console.log(`Downloading ${file.name}...`);
			},
		});
		actions.appendChild(downloadAction);

		// Create rename action
		const renameAction = createAction({
			actionName: "rename",
			icon: getActionIcon("rename"),
			callback: () => {
				console.log(`Renaming ${file.name}...`);
			},
		});
		actions.appendChild(renameAction);

		if (file.isFavorite) {
			// Create remove from favorites file action
			const removeFromFavoritesAction = createAction({
				actionName: "removeFromFavorites",
				icon: getActionIcon("removeFromFavoritesAction"),
				callback: () => {
					console.log(`Removing ${file.name} from favorites...`);
				},
			});
			actions.appendChild(removeFromFavoritesAction);
		} else {
			// Create add to favorites file action
			const addToFavoritesAction = createAction({
				actionName: "addToFavorites",
				icon: getActionIcon("addToFavorites"),
				callback: () => {
					console.log(`Adding ${file.name} to favorites...`);
				},
			});
			actions.appendChild(addToFavoritesAction);
		}

		// Create see more action
		const seeMore = createAction({
			actionName: "seeMore",
			icon: getActionIcon("seeMore"),
			callback: () => {
				console.log(`Opening other actions...`);
			},
		});
		actions.appendChild(seeMore);

		console.log(file);
	}
}

function createAction({ actionName, icon, callback }) {
	const action = document.createElement("li");
	action.classList.add("action");

	// Create the action button
	const actionButton = document.createElement("button");
	actionButton.classList.add(`${actionName}ActionButton`);
	actionButton.innerHTML = getActionIcon(actionName);

	// Add functionality to the button
	actionButton.addEventListener("click", callback);

	// Insert the action button inside the action
	action.appendChild(actionButton);

	return action;
}

function createFilesContainer() {}

function getFileIcon(type) {
	let icon;
	if (type.includes("image")) {
		icon = "🖼️";
	} else if (type.includes("video")) {
		icon = "🎞️";
	} else if (type.includes("audio")) {
		icon = "🎧";
	} else {
		icon = "📄";
	}

	return icon;
}

function getFolderIcon(isFolderShared) {
	let icon;
	if (isFolderShared) {
		icon = "📁";
	} else {
		icon = "🧑‍🧒‍🧒";
	}

	return icon;
}

function getActionIcon(action) {
	switch (action) {
		case "download":
			return "⬇️";
		case "rename":
			return "🖋️";
		case "addToFavorites":
			return "☆";
		case "removeFromFavorites":
			return "★";
		case "seeMore":
			return "︙";
		default:
			return "❔";
	}
}
