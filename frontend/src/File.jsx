export default function File({
	metadata,
	isInSelectMode,
	selectFileCallback,
	unselectFileCallback,
}) {
	if (!metadata) {
		return <div>Loading...</div>;
	}

	// Create a checkbox
	let checkbox;
	let handleCheckboxChange = (e) => {
		// Avoid triggering the parent element's event/s
		e.stopPropagation();

		// Execute the call back for selecting and unselecting the file
		if (e.target.checked) {
			selectFileCallback();
		} else {
			unselectFileCallback();
		}
	};
	if (isInSelectMode) {
		checkbox = (
			<input
				className="checkbox"
				type="checkbox"
				onChange={handleCheckboxChange}
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
				datetime={new Date(metadata.createdAt)}
			>
				{new Date(metadata.createdAt).toDateString()}
			</time>
			<div className="owner">
				<img src={metadata.owner.profilePictureUrl} />
				<span class="username">{metadata.owner.username}</span>
			</div>
			<div className="location">
				<span className="iconContainer"></span>
				<div className="name">{metadata.folder.name}</div>
			</div>
			<div className="actions"></div>
		</a>
	);
}
