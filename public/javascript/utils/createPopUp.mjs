import createElement from "./createElement.mjs";

export default function createPopUp() {
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

	return {
		element: popUp,
		close: () => {
			popUp.parentElement.removeChild(popUp);
		},
		append: (node) => {
			popUp.appendChild(node);
		},
	};
}
