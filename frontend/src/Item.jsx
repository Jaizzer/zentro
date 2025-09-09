import { useState } from "react";

export default function Item({
	item,
	isInSelectMode,
	selectItemCallback,
	unselectItemCallback,
}) {
	const [isSelected, setIsSelected] = useState(false);

	// Render a loading message if the item is not yet available
	if (!item) {
		return <div>Loading...</div>;
	}

	// Create a checkbox
	let checkbox;
	let handleItemSelect = (e) => {
		// Avoid triggering the parent element's event/s
		e.stopPropagation();

		// Execute the call back for selecting and unselecting the item
		if (!isSelected) {
			setIsSelected(!isSelected);
			selectItemCallback();
		} else {
			setIsSelected(!isSelected);
			unselectItemCallback();
		}
	};

	if (isInSelectMode) {
		checkbox = (
			<input
				className="checkbox"
				type="checkbox"
				checked={isSelected}
				onChange={handleItemSelect}
			/>
		);
	}

	return (
		<a>
			{checkbox}
			<div className="label">
				<span className="iconContainer"></span>
				<span className="name">{item.name}</span>
			</div>
			<time className="creationDate" dateTime={new Date(item.createdAt)}>
				{new Date(item.createdAt).toDateString()}
			</time>
			<div className="owner">
				<img src={item.owner.profilePictureUrl} />
				<span className="username">{item.owner.username}</span>
			</div>
			<div className="location">
				<span className="iconContainer"></span>
				<div className="name">{item.folder.name}</div>
			</div>
			<div className="actions"></div>
		</a>
	);
}
