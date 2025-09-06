import getData from "./getData.js";
import createElement from "./utils/createElement.mjs";
import createFolders from "./utils/createFolders.mjs";

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
