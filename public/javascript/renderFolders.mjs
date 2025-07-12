import getData from "/javascript/getData.js";

// Render the initial fields
renderFolders();

async function renderFolders() {
	console.log(getData);
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
	const foldersSection = document.createElement("section");
	foldersSection.classList.add("foldersSection");
	home.appendChild(foldersSection);

	// Create the section title
	const title = document.createElement("h2");
	title.textContent = "Folders";
	foldersSection.appendChild(title);

	// Create the folders container
	const foldersContainer = document.createElement("div");
	foldersContainer.classList.add("foldersContainer");
	foldersSection.appendChild(foldersContainer);

	// Render the folders
	const foldersHTML = createFolders({ folders, userId });
	for (const folderHTML of foldersHTML || []) {
		foldersContainer.appendChild(folderHTML);
	}

	if (isNextAvailable) {
		// Create the "View More" Button
		const viewMoreButton = document.createElement("button");
		viewMoreButton.classList.add("viewMoreButton");
		viewMoreButton.textContent = "View More";

		// Add functionality to the "View More Button"
		viewMoreButton.addEventListener("click", async () => {
			const url = "http://localhost:9000/folder?page=next";

			// Fetch the folders
			const { folders, userId, isNextAvailable } = await getData(url);

			// Render the folders
			const upcomingFoldersHTML = createFolders({ folders, userId });
			for (const upcomingFolderHTML of upcomingFoldersHTML || []) {
				foldersContainer.appendChild(upcomingFolderHTML);
			}

			// Remove the view more button if there's no any other folders to be fetched
			if (!isNextAvailable) {
				viewMoreButton.parentElement.removeChild(viewMoreButton);
			}
		});
		foldersSection.appendChild(viewMoreButton);
	}
}

function createFolders({ folders, userId }) {
	let foldersHTML = [];

	for (const folder of folders || []) {
		// Create main folder container
		const folderDiv = document.createElement("div");
		folderDiv.classList.add("folder");
		foldersHTML.push(folderDiv);

		// Create folder icon
		const folderIconContainer = document.createElement("span");
		folderIconContainer.classList.add("iconContainer");
		folderIconContainer.innerHTML = "📁";
		folderDiv.appendChild(folderIconContainer);

		// Create foldername
		const foldername = document.createElement("p");
		foldername.classList.add("name");
		foldername.textContent = folder.name;
		folderDiv.appendChild(foldername);

		// Create folder content count
		const folderContentCount = document.createElement("p");
		folderContentCount.classList.add("contentCount");
		folderContentCount.textContent = `${folder.files.length} files`;
		folderDiv.appendChild(folderContentCount);
	}

	return foldersHTML;
}

async function renderFolderlessDriveMessage() {
	const homeSection = document.querySelector(".homeSection");

	const folderlessDriveMessage = document.createElement("section");
	folderlessDriveMessage.classList.add("blankDriveMessage");
	homeSection.appendChild(folderlessDriveMessage);

	const iconContainer = document.createElement("span");
	iconContainer.classList.add("iconContainer");
	iconContainer.innerHTML = "🦜";
	folderlessDriveMessage.appendChild(iconContainer);

	const heading = document.createElement("h2");
	heading.textContent = "Nothing here yet!";
	folderlessDriveMessage.appendChild(heading);

	const message = document.createElement("p");
	message.textContent = "Start by creating or uploading a folder.";
	folderlessDriveMessage.appendChild(message);
}
