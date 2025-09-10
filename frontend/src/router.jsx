import { createBrowserRouter } from "react-router";
import Error from "./Error";

const routes = [
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
	},

	{
		path: "/auth/sign-up",
		element: <SignUp />,
	},
];

const router = createBrowserRouter(routes);

export default router;
