import createFoldersSection from "./createFoldersSection.mjs";
import createFilesSection from "./createFilesSection.mjs";

async function renderFolder() {
	// Access the main folder container
	const folderContainer = document.querySelector(".folderSection");

	// Retrieve the injected contents of the folder
	const folder = JSON.parse(folderContainer.dataset.folder)[0];

	// Render the children folders
	if (folder.childrenFolders.length) {
		const folderSection = await createFoldersSection({
			folders: folder.childrenFolders,
		});
		folderContainer.appendChild(folderSection);
	}

	// Render children files
	if (folder.files.length) {
		const fileSection = await createFilesSection({ files: folder.files });
		folderContainer.appendChild(fileSection);
	}
}

renderFolder();
