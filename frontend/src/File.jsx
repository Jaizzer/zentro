export default function File({ metadata }) {
	return (
		<a>
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
