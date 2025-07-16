import createElement from "/javascript/utils/createElement.mjs";

export default function createPopUp(childNode) {
	const popUpBackground = createElement({
		tag: "div",
		attributes: {
			className: "popUpBackground",
		},
	});
	// Add styling to the background
	Object.assign(popUpBackground.style, {
		width: "100dvw",
		height: "100dvh",
		backgroundColor: "rgba(0, 0, 0, 0.45)",
		position: "absolute",
		top: "0px",
		left: "0px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	});

	const popUpContainer = createElement({
		tag: "div",
		attributes: {
			className: "popUpContainer",
		},
	});
	popUpContainer.appendChild(childNode);
	popUpBackground.appendChild(popUpContainer);

	return popUpBackground;
}
