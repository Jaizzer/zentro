async function renderFolder() {
	const folderContainer = document.querySelector(".folderSection");
	const folder = JSON.parse(folderContainer.dataset.folder);
	console.log(folder);
}

renderFolder();
