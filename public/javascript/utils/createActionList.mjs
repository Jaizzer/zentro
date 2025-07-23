import createElement from "/javascript/utils/createElement.mjs";

export default function createActionList(actions) {
	const actionList = createElement({
		tag: "ul",
		attributes: { className: "actions" },
	});

	const addAction = ({ actionName, icon, callback }) => {
		actionList.appendChild(createAction({ actionName, icon, callback }));
	};

	// Add provided actions
	for (const action of actions || []) {
		addAction(action);
	}

	return { element: actionList, addAction };
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
