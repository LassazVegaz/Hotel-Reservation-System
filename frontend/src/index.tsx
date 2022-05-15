import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./index.scss";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<App />
		</LocalizationProvider>
	</React.StrictMode>
);
