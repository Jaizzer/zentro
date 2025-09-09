import { useState } from "react";

export default function File({
	file,
	isInSelectMode,
	selectFileCallback,
	unselectFileCallback,
}) {
	const [isSelected, setIsSelected] = useState(false);

	// Render a loading message of the file is not yet available
	if (!file) {
		return <div>Loading...</div>;
	}

	// Create a checkbox
	let checkbox;
	let handleFileSelect = (e) => {
		// Avoid triggering the parent element's event/s
		e.stopPropagation();

		// Execute the call back for selecting and unselecting the file
		if (!isSelected) {
			setIsSelected(!isSelected);
			selectFileCallback();
		} else {
			setIsSelected(!isSelected);
			unselectFileCallback();
		}
	};

	if (isInSelectMode) {
		checkbox = (
			<input
				className="checkbox"
				type="checkbox"
				checked={isSelected}
				onChange={handleFileSelect}
			/>
		);
	}

	return (
		<a>
			{checkbox}
			<div className="label">
				<span className="iconContainer"></span>
				<span className="name">{file.name}</span>
			</div>
			<time className="creationDate" dateTime={new Date(file.createdAt)}>
				{new Date(file.createdAt).toDateString()}
			</time>
			<div className="owner">
				<img src={file.owner.profilePictureUrl} />
				<span className="username">{file.owner.username}</span>
			</div>
			<div className="location">
				<span className="iconContainer"></span>
				<div className="name">{file.folder.name}</div>
			</div>
			<div className="actions"></div>
		</a>
	);
}
