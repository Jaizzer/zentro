import createFoldersSection from "./createFoldersSection.mjs";
import createEmptyVaultMessage from "./createEmptyVaultMessage.mjs";
import createFilesSection from "./createFilesSection.mjs";

async function appendMoreContentToHome() {
	const home = document.querySelector(".homeSection");

	const filesSection = await createFilesSection({
		initialUrl: "http://localhost:9000/file/recent",
		nextUrl: "http://localhost:9000/file/recent?page=next",
	});

	const foldersSection = await createFoldersSection({
		initialUrl: "http://localhost:9000/folder",
		nextUrl: "http://localhost:9000/folder?page=next",
	});

	if (foldersSection) {
		home.appendChild(foldersSection);
	}

	if (filesSection) {
		home.appendChild(filesSection);
	}

	if (!filesSection && !foldersSection) {
		const emptyVaultMessage = createEmptyVaultMessage();
		home.appendChild(emptyVaultMessage);
	}
}

appendMoreContentToHome();
