import getData from "/javascript/getData.js";

// Render the initial fields
renderFiles();

async function renderFiles() {
	const url = "http://localhost:9000/file/recent";
	const { files, userId, isNextAvailable } = await getData(url);

	if (files.length !== 0) {
		renderRecentFilesSection({ files, userId, isNextAvailable });
	} else {
		renderFilelessDriveMessage();
	}
}

function renderRecentFilesSection({ files, userId, isNextAvailable }) {
	// Access the home page
	const home = document.querySelector(".homeSection");

	// Create the main section
	const recentFilesSection = document.createElement("section");
	recentFilesSection.classList.add("recentFilesSection");
	home.appendChild(recentFilesSection);

	// Create the section title
	const title = document.createElement("h2");
	title.textContent = "Recent Files";
	recentFilesSection.appendChild(title);

	// Create the files container
	const filesContainer = document.createElement("div");
	filesContainer.classList.add("filesContainer");
	recentFilesSection.appendChild(filesContainer);

	// Create the file list header
	const header = document.createElement("div");
	header.classList.add("header");
	filesContainer.appendChild(header);

	// Create the column titles
	const columnNames = ["Name", "Creation Date", "Owner", "Location"];
	for (const columnName of columnNames || []) {
		const span = document.createElement("div");
		const camelize = (string) => {
			return string
				.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
					return index === 0
						? word.toLowerCase()
						: word.toUpperCase();
				})
				.replace(/\s+/g, "");
		};
		span.classList.add(camelize(columnName));
		span.textContent = columnName;
		header.appendChild(span);
	}

	// Render the files
	const filesHTML = createFiles({ files, userId });
	for (const fileHTML of filesHTML || []) {
		filesContainer.appendChild(fileHTML);
	}

	// Render the view more button only if there are more files to be fetched
	if (isNextAvailable) {
		// Create the "View More" Button
		const viewMoreButton = document.createElement("button");
		viewMoreButton.classList.add("viewMoreButton");
		viewMoreButton.textContent = "View More";

		// Add functionality to the "View More Button"
		viewMoreButton.addEventListener("click", async () => {
			const url = "http://localhost:9000/file/recent?page=next";

			// Fetch the files
			const { files, userId, isNextAvailable } = await getData(url);

			// Render the files
			const upcomingFilesHTML = createFiles({ files, userId });
			for (const upcomingFileHTML of upcomingFilesHTML || []) {
				filesContainer.appendChild(upcomingFileHTML);
			}

			// Remove the view more button if there are no longer files to be fetched
			if (!isNextAvailable) {
				viewMoreButton.parentElement.removeChild(viewMoreButton);
			}
		});
		recentFilesSection.appendChild(viewMoreButton);
	}
}

function createFiles({ files, userId }) {
	let filesHTML = [];

	for (const file of files || []) {
		// Create main file metadata container
		const fileDiv = document.createElement("div");
		fileDiv.classList.add("file");
		filesHTML.push(fileDiv);

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
	}

	return filesHTML;
}

function createAction({ actionName, icon, callback }) {
	const action = document.createElement("li");
	action.classList.add("action");

	// Create the action button
	const actionButton = document.createElement("button");
	actionButton.classList.add(`${actionName}ActionButton`);
	actionButton.innerHTML = getActionIcon(actionName);
	actionButton.title = actionName
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, function (str) {
			return str.toUpperCase();
		});

	// Add functionality to the button
	actionButton.addEventListener("click", callback);

	// Insert the action button inside the action
	action.appendChild(actionButton);

	return action;
}

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
			return "⭐️";
		case "seeMore":
			return "︙";
		default:
			return "❔";
	}
}

async function renderFilelessDriveMessage() {
	const homeSection = document.querySelector(".homeSection");

	const filelessDriveMessage = document.createElement("section");
	filelessDriveMessage.classList.add("blankDriveMessage");
	homeSection.appendChild(filelessDriveMessage);

	const iconContainer = document.createElement("span");
	iconContainer.classList.add("iconContainer");
	iconContainer.innerHTML = "📭";
	filelessDriveMessage.appendChild(iconContainer);

	const heading = document.createElement("h2");
	heading.textContent = "Nothing here yet!";
	filelessDriveMessage.appendChild(heading);

	const message = document.createElement("p");
	message.textContent =
		"Start by uploading your first file or organizing with folders.";
	filelessDriveMessage.appendChild(message);
}
