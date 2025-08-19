import getFileIcon from "./getFileIcon.mjs";
import createElement from "./createElement.mjs";
import createFileActionList from "./createFileActionList.mjs";
import {
	defaultFolderIcon,
	sharedWithYouFolderIcon,
} from "/icons/folderIcons.mjs";

export default class FileView {
	static isCheckboxEnabled = false;

	static instances = [];

	static enableCheckbox() {
		this.isCheckboxEnabled = true;
		this.instances.forEach((instance) => instance.addCheckbox());
	}

	static disableCheckbox() {
		this.isCheckboxEnabled = false;
		this.instances.forEach((instance) => instance.removeCheckbox());
	}

	constructor(file, checkboxCheckedCallback, checkboxUncheckedCallback) {
		// Save the file info
		this.file = file;

		// Save the checkbox on change callback
		this.checkboxCheckedCallback = checkboxCheckedCallback;
		this.checkboxUncheckedCallback = checkboxUncheckedCallback;

		// Create the element
		this.element = createElement({
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
		this.element.appendChild(fileLabel);

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
		this.element.appendChild(creationDate);

		// Create file owner information
		const owner = createElement({
			tag: "div",
			attributes: {
				className: "owner",
			},
		});
		this.element.appendChild(owner);

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
		this.element.appendChild(location);

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
		this.element.appendChild(actionList);

		// Add checkbox if it is enabled
		if (FileView.isCheckboxEnabled) {
			this.addCheckbox();
		}

		// Insert the current file view to the array of File View instances
		FileView.instances.push(this);
	}

	addCheckbox() {
		// Add checkbox
		const checkbox = createElement({
			tag: "input",
			attributes: {
				type: "checkbox",
				className: "fileCheckbox",
			},
			eventListener: {
				event: "change",
				callback: (e) => {
					e.stopPropagation();
					if (e.target.checked) {
						this.checkboxUncheckedCallback(this.file);
					} else {
						this.checkboxCheckedCallback(this.file);
					}
					e.target.checked = !e.target.checked;
				},
			},
		});
		const fileLabel = this.element.querySelector(".label");
		fileLabel.prepend(checkbox);

		// Update checkbox whenever the user clicks the file through an event to trigger the checkbox' event listeners
		this.element.addEventListener("click", (e) => {
			e.stopPropagation();
			checkbox.dispatchEvent(new Event("change"));
		});
	}

	removeCheckbox() {
		// Remove the check box
		const checkbox = this.element.querySelector("input");
		if (checkbox) {
			checkbox.parentElement.removeChild(checkbox);
		}
	}
}
