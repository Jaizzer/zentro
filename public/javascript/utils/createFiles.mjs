import getFileIcon from "/javascript/utils/getFileIcon.mjs";
import createElement from "/javascript/utils/createElement.mjs";
import createFileActionList from "/javascript/utils/createFileActionList.mjs";
import {
	defaultFolderIcon,
	sharedWithYouFolderIcon,
} from "/icons/folderIcons.mjs";

export default function createFiles({ files }) {
	let fileDivs = [];

	for (const file of files || []) {
		const fileDiv = createFile({ file });
		fileDivs.push(fileDiv);
	}

	const enableCheckboxMode = () => {
		for (const fileDiv of fileDivs) {
			fileDiv.enableCheckboxMode();
		}
	};

	const fileDivsHtml = fileDivs.map((fileDiv) => fileDiv.html);

	return { html: fileDivsHtml, enableCheckboxMode };
}

function createFile({ file }) {
	// Create main file metadata container
	const fileDiv = createElement({
		tag: "div",
		attributes: {
			className: "file",
		},
	});

	// Create file label
	const fileLabel = createElement({
		tag: "div",
		attributes: {
			className: "label",
		},
	});
	fileDiv.appendChild(fileLabel);

	// Create file icon
	const fileIconContainer = createElement({
		tag: "span",
		attributes: {
			className: "iconContainer",
			innerHTML: getFileIcon(file.type.split("/")[1]),
		},
	});
	fileLabel.appendChild(fileIconContainer);

	// Create filename
	const filename = createElement({
		tag: "span",
		attributes: {
			className: "name",
			textContent: file.name,
		},
	});
	fileLabel.appendChild(filename);

	// Create file creation date
	const creationDate = createElement({
		tag: "time",
		attributes: {
			className: "creationDate",
			dateTime: new Date(file.createdAt),
			textContent: new Date(file.createdAt).toDateString(),
		},
	});
	fileDiv.appendChild(creationDate);

	// Create file owner information
	const owner = createElement({
		tag: "div",
		attributes: {
			className: "owner",
		},
	});
	fileDiv.appendChild(owner);

	const ownerProfilePicture = createElement({
		tag: "img",
		attributes: {
			className: "profilePicture",
			src: file.owner.profilePictureUrl,
		},
	});
	owner.appendChild(ownerProfilePicture);

	const ownerUsername = createElement({
		tag: "span",
		attributes: {
			className: "ownerUsername",
			textContent: file.owner.username,
		},
	});
	owner.appendChild(ownerUsername);

	// Create file location information
	const location = createElement({
		tag: "div",
		attributes: {
			className: "location",
		},
	});
	fileDiv.appendChild(location);

	const folderIconContainer = createElement({
		tag: "span",
		attributes: {
			className: "iconContainer",
			innerHTML:
				file.folder.name !== "Shared with you"
					? defaultFolderIcon
					: sharedWithYouFolderIcon,
		},
	});
	location.appendChild(folderIconContainer);

	const folderName = createElement({
		div: "span",
		attributes: {
			className: "name",
			textContent: file.folder.name,
		},
	});
	location.appendChild(folderName);

	// Create file actions
	const actionList = createFileActionList(file);
	fileDiv.appendChild(actionList);

	const enableCheckboxMode = () => {
		const checkbox = createElement({
			tag: "input",
			attributes: {
				type: "checkbox",
				className: "fileCheckbox",
			},
		});

		fileLabel.prepend(checkbox);
	};

	return { html: fileDiv, enableCheckboxMode };
}
