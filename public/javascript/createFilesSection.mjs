import getData from "./getData.js";
import createElement from "./utils/createElement.mjs";
import camelize from "./utils/camelize.mjs";
import createFileView from "./utils/createFileView.mjs";
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

						// Enable file selection mode
					} else {
						// Update button text
						e.target.textContent = "Select Files";

						filesSection.removeChild(selectedFilesTab.html);

						// Disable file selection mode
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

		// Create the file views
		const fileViews = files.map((file) => createFileView({ file }));

		for (const fileView of fileViews || []) {
			filesContainer.appendChild(fileView.element);
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
						// Fetch the next batch of files
						const { files, isNextAvailable } = await getData(
							nextUrl
						);

						// Create the upcoming file views
						const upcomingFileViews = files.map((upcomingFile) =>
							createFileView({ file: upcomingFile })
						);

						// Render the upcoming file views
						for (const upcomingFileView of upcomingFileViews ||
							[]) {
							filesContainer.appendChild(
								upcomingFileView.element
							);
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
