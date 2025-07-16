import getData from "/javascript/getData.js";
import createElement from "/javascript/utils/createElement.mjs";

// Render the initial fields
renderFolders();

async function renderFolders() {
	const url = "http://localhost:9000/folder";
	const { folders, userId, isNextAvailable } = await getData(url);

	if (folders.length !== 0) {
		renderFoldersSection({ folders, userId, isNextAvailable });
	} else {
		renderFolderlessDriveMessage();
	}
}

async function renderFoldersSection({ folders, userId, isNextAvailable }) {
	// Access the home page
	const home = document.querySelector(".homeSection");

	// Create the main section
	const foldersSection = createElement({
		tag: "section",
		attributes: {
			className: "foldersSection",
		},
	});
	home.appendChild(foldersSection);

	// Create the section title
	const title = createElement({
		tag: "h2",
		attributes: {
			textContent: "Folders",
		},
	});
	foldersSection.appendChild(title);

	// Create the folders container
	const foldersContainer = createElement({
		tag: "div",
		attributes: {
			className: "foldersContainer",
		},
	});
	foldersSection.appendChild(foldersContainer);

	// Render the folders
	const foldersHTML = createFolders({ folders, userId });
	for (const folderHTML of foldersHTML || []) {
		foldersContainer.appendChild(folderHTML);
	}

	// Render the view more button only if there are more folders to be fetched
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
					const url = "http://localhost:9000/folder?page=next";

					// Fetch the folders
					const { folders, userId, isNextAvailable } = await getData(
						url
					);

					// Render the files
					const upcomingFoldersHTML = createFolders({
						folders,
						userId,
					});
					for (const upcomingFolderHTML of upcomingFoldersHTML ||
						[]) {
						foldersContainer.appendChild(upcomingFolderHTML);
					}

					// Remove the view more button if there are no longer folders to be fetched
					if (!isNextAvailable) {
						e.target.parentElement.removeChild(viewMoreButton);
					}
				},
			},
		});
		foldersSection.appendChild(viewMoreButton);
	}
}

function createFolders({ folders, userId }) {
	let foldersHTML = [];

	for (const folder of folders || []) {
		// Create main folder container
		const folderDiv = createElement({
			tag: "div",
			attributes: {
				className: "folder",
			},
		});
		foldersHTML.push(folderDiv);

		// Create folder icon
		const folderIconContainer = createElement({
			tag: "span",
			attributes: {
				className: "iconContainer",
				innerHTML: "📁",
			},
		});
		folderDiv.appendChild(folderIconContainer);

		// Create foldername
		const foldername = createElement({
			tag: "p",
			attributes: {
				className: "name",
				textContent: folder.name,
			},
		});
		folderDiv.appendChild(foldername);

		// Create folder content count
		const folderContentCount = createElement({
			tag: "p",
			attributes: {
				className: "contentCount",
				textContent: `${folder.files.length} files`,
			},
		});
		folderDiv.appendChild(folderContentCount);
	}

	return foldersHTML;
}

async function renderFolderlessDriveMessage() {
	const homeSection = document.querySelector(".homeSection");

	const folderlessDriveMessage = createElement({
		tag: "section",
		attributes: {
			className: "blankDriveMessage",
		},
	});
	homeSection.appendChild(folderlessDriveMessage);

	const iconContainer = createElement({
		tag: "span",
		attributes: {
			className: "iconContainer",
			innerHTML: "🦜",
		},
	});
	folderlessDriveMessage.appendChild(iconContainer);

	const heading = createElement({
		tag: "h2",
		attributes: { textContent: "Nothing here yet." },
	});
	folderlessDriveMessage.appendChild(heading);

	const message = createElement({
		tag: "p",
		attributes: {
			textContent: "Start by creating or uploading a folder.",
		},
	});
	folderlessDriveMessage.appendChild(message);
}
