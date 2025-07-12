export default function createElement({ tag, attributes, eventListener }) {
	// Create the element
	const element = document.createElement(`${tag}`);

	// Add element attributes
	for (const attributeName in attributes) {
		element[attributeName] = attributes[attributeName];
	}

	// Add event listener
	if (eventListener) {
		element.addEventListener(eventListener.event, eventListener.callback);
	}

	return element;
}
