import getData from "/javascript/getData.js";
import createElement from "/javascript/utils/createElement.mjs";
import camelize from "/javascript/utils/camelize.mjs";
import renderDownloadPromptPopUp from "/javascript/utils/renderDownloadPromptPopUp.mjs";
import createActionList from "/javascript/utils/createActionList.mjs";

export default async function createFilesSection({ initialUrl, nextUrl }) {
	// Perform initial file request
	const { files, userId, isNextAvailable } = await getData(initialUrl);

	if (files?.length !== 0) {
		// Create the main section
		const filesSection = createElement({
			tag: "div",
			attributes: {
				className: "filesSection",
			},
		});

		// Create the section title
		const title = createElement({
			tag: "h2",
			attributes: {
				textContent: "Recent Files",
			},
		});
		filesSection.appendChild(title);

		// Create the files container
		const filesContainer = createElement({
			tag: "div",
			attributes: {
				className: "filesContainer",
			},
		});
		filesSection.appendChild(filesContainer);

		// Create the file list header
		const header = createElement({
			tag: "div",
			attributes: {
				className: "header",
			},
		});
		filesContainer.appendChild(header);

		// Create the column titles
		const columnNames = ["Name", "Creation Date", "Owner", "Location"];
		for (const columnName of columnNames || []) {
			const span = createElement({
				tag: "span",
				attributes: {
					textContent: columnName,
					className: camelize(columnName),
				},
			});
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
			const viewMoreButton = createElement({
				tag: "button",
				attributes: {
					className: "viewMoreButton",
					textContent: "View More",
				},
				eventListener: {
					event: "click",
					callback: async (e) => {
						// Fetch the files
						const { files, userId, isNextAvailable } =
							await getData(nextUrl);

						// Render the files
						const upcomingFilesHTML = createFiles({
							files,
							userId,
						});
						for (const upcomingFileHTML of upcomingFilesHTML ||
							[]) {
							filesContainer.appendChild(upcomingFileHTML);
						}

						// Remove the view more button if there are no longer files to be fetched
						if (!isNextAvailable) {
							e.target.parentElement.removeChild(viewMoreButton);
						}
					},
				},
			});

			filesSection.appendChild(viewMoreButton);
		}
		return filesSection;
	} else {
		return null;
	}
}

function createFiles({ files, userId }) {
	let filesHTML = [];

	for (const file of files || []) {
		// Create main file metadata container
		const fileDiv = createElement({
			tag: "div",
			attributes: {
				className: "file",
			},
		});
		filesHTML.push(fileDiv);

		// Create file label
		const fileLabel = createElement({
			tag: "div",
			attributes: {
				className: "label",
			},
		});
		fileDiv.appendChild(fileLabel);

		// Create file icon
		const fileIconContainer = createElement({
			tag: "span",
			attributes: {
				className: "iconContainer",
				innerHTML: getFileIcon(file.type),
			},
		});
		fileLabel.appendChild(fileIconContainer);

		// Create filename
		const filename = createElement({
			tag: "span",
			attributes: {
				className: "name",
				textContent: file.name,
			},
		});
		fileLabel.appendChild(filename);

		// Create file creation date
		const creationDate = createElement({
			tag: "time",
			attributes: {
				className: "creationDate",
				dateTime: new Date(file.createdAt),
				textContent: new Date(file.createdAt).toDateString(),
			},
		});
		fileDiv.appendChild(creationDate);

		// Create file owner information
		const owner = createElement({
			tag: "div",
			attributes: {
				className: "owner",
			},
		});
		fileDiv.appendChild(owner);

		const ownerProfilePicture = createElement({
			tag: "img",
			attributes: {
				className: "profilePicture",
				src: file.owner.profilePictureUrl,
			},
		});
		owner.appendChild(ownerProfilePicture);

		const ownerUsername = createElement({
			tag: "span",
			attributes: {
				className: "ownerUsername",
				textContent: `${
					file.owner.id === userId ? "You" : file.owner.username
				}`,
			},
		});
		owner.appendChild(ownerUsername);

		// Create file location information
		const location = createElement({
			tag: "div",
			attributes: {
				className: "location",
			},
		});
		fileDiv.appendChild(location);

		const folderIconContainer = createElement({
			tag: "span",
			attributes: {
				className: "iconContainer",
				innerHTML: getFolderIcon(file.owner.id === userId),
			},
		});
		location.appendChild(folderIconContainer);

		const folderName = createElement({
			div: "span",
			attributes: {
				className: "name",
				textContent:
					file.owner.id === userId
						? file.folder?.name
						: "Shared with You",
			},
		});
		location.appendChild(folderName);

		// Create file actions
		const actionList = createActionList();
		fileDiv.appendChild(actionList.element);

		// Create download action
		actionList.addAction({
			actionName: "download",
			icon: getActionIcon("download"),
			callback: () => {
				renderDownloadPromptPopUp(file);
			},
		});

		// Create rename action
		actionList.addAction({
			actionName: "rename",
			icon: getActionIcon("rename"),
			callback: () => {
				console.log(`Renaming ${file.name}...`);
			},
		});

		if (file.isFavorite) {
			// Create remove from favorites file action
			actionList.addAction({
				actionName: "removeFromFavorites",
				icon: getActionIcon("removeFromFavoritesAction"),
				callback: () => {
					console.log(`Removing ${file.name} from favorites...`);
				},
			});
		} else {
			// Create add to favorites file action
			actionList.addAction({
				actionName: "addToFavorites",
				icon: getActionIcon("addToFavorites"),
				callback: () => {
					console.log(`Adding ${file.name} to favorites...`);
				},
			});
		}

		// Create see more action
		actionList.addAction({
			actionName: "seeMore",
			icon: getActionIcon("seeMore"),
			callback: () => {
				console.log(`Opening other actions...`);
			},
		});
	}

	return filesHTML;
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
