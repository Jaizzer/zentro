import createElement from "/javascript/utils/createElement.mjs";

export default function createPopUp(childNode) {
	const popUp = createElement({
		tag: "div",
		attributes: {
			className: "popUp",
		},
	});
	// Add styling to the background
	Object.assign(popUp.style, {
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
	popUp.appendChild(childNode);

	return popUp;
}
