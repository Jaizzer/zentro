import getData from "/javascript/getData.js";
import createElement from "/javascript/utils/createElement.mjs";

export default async function createFoldersSection({ initialUrl, nextUrl }) {
	const { folders, isNextAvailable } = await getData(initialUrl);

	if (folders?.length !== 0) {
		// Create the main section
		const foldersSection = createElement({
			tag: "section",
			attributes: {
				className: "foldersSection",
			},
		});

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
		const foldersHTML = createFolders({ folders });
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
						// Fetch the folders
						const { folders, userId, isNextAvailable } =
							await getData(nextUrl);

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
		return foldersSection;
	} else {
		return null;
	}
}

function createFolders({ folders }) {
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
