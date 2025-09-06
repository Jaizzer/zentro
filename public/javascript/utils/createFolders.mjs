import createElement from "./createElement.mjs";

export default function createFolders({ folders }) {
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
	}

	return foldersHTML;
}
