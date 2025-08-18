import createElement from "./createElement.mjs";

export default function createActionList(actions) {
	const actionList = createElement({
		tag: "ul",
		attributes: { className: "actions" },
	});

	// Add provided actions
	for (const action of actions || []) {
		actionList.appendChild(createAction(action));
	}

	return actionList;
}

function createAction({ actionName, icon, callback }) {
	const action = createElement({
		tag: "li",
		action: {
			className: "action",
		},
	});

	// Create the action button
	const actionButton = createElement({
		tag: "button",
		attributes: {
			className: `${actionName}ActionButton`,
			title: actionName
				.replace(/([A-Z])/g, " $1")
				.replace(/^./, function (str) {
					return str.toUpperCase();
				}),
			innerHTML: icon,
		},
		eventListener: {
			event: "click",
			callback: callback,
		},
	});

	// Insert the action button inside the action
	action.appendChild(actionButton);

	return action;
}
