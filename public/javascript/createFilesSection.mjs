import getData from "/javascript/getData.js";
import createElement from "/javascript/utils/createElement.mjs";
import camelize from "/javascript/utils/camelize.mjs";
import createFiles from "/javascript/utils/createFiles.mjs";
import createSelectedFilesTab from "./utils/createSelectedFilesTab.mjs";

export default async function createFilesSection({ initialUrl, nextUrl }) {
	// Perform initial file request
	const { files, isNextAvailable } = await getData(initialUrl);

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

		// Create selected files tab
		const selectedFilesTab = createSelectedFilesTab();

		// Create the selected files tab visibility toggle button
		const selectFilesButton = createElement({
			tag: "button",
			attributes: {
				className: "selectFilesButton",
				textContent: "Select Files",
			},
			eventListener: {
				event: "click",
				callback: (e) => {
					if (e.target.textContent === "Select Files") {
						// Update button text
						e.target.textContent = "Cancel";

						filesSection.insertBefore(
							selectedFilesTab.html,
							title.nextElementSibling
						);
					} else {
						// Update button text
						e.target.textContent = "Select Files";

						filesSection.removeChild(selectedFilesTab.html);
					}
				},
			},
		});
		filesSection.appendChild(selectFilesButton);

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
		const filesHTML = createFiles({ files });
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
						const { files, isNextAvailable } = await getData(
							nextUrl
						);

						// Render the files
						const upcomingFilesHTML = createFiles({
							files,
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
