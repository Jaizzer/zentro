import { useState } from "react";

export default function File({
	metadata,
	isInSelectMode,
	selectFileCallback,
	unselectFileCallback,
}) {
	const [isSelected, setIsSelected] = useState(false);

	if (!metadata) {
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
				<span className="name">{metadata.name}</span>
			</div>
			<time
				className="creationDate"
				dateTime={new Date(metadata.createdAt)}
			>
				{new Date(metadata.createdAt).toDateString()}
			</time>
			<div className="owner">
				<img src={metadata.owner.profilePictureUrl} />
				<span className="username">{metadata.owner.username}</span>
			</div>
			<div className="location">
				<span className="iconContainer"></span>
				<div className="name">{metadata.folder.name}</div>
			</div>
			<div className="actions"></div>
		</a>
	);
}
