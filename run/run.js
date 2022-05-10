import { VT } from "open-term";
import minimist from "minimist";

const SERVICES_FOLDER = "../services";
const args = minimist(process.argv.slice(2));

const appsPaths = {
	users: { type: "service", path: SERVICES_FOLDER + "/users-service" },
	hotels: { type: "service", path: SERVICES_FOLDER + "/hotels-service" },
	reservations: {
		type: "service",
		path: SERVICES_FOLDER + "/reservations-service",
	},
};

const buildCommand = (folderPath) => "npm start --prefix " + folderPath;

const runApp = (appName) => VT.win32.cmd(buildCommand(appsPaths[appName].path));

const runAllApps = () => {
	for (const appName in appsPaths) {
		if (Object.hasOwnProperty.call(appsPaths, appName)) {
			runApp(appName);
		}
	}
};

const runAllServices = () => {
	for (const serviceName in appsPaths) {
		if (Object.hasOwnProperty.call(appsPaths, serviceName)) {
			const value = appsPaths[serviceName];
			if (value.type === "service") runApp(serviceName);
		}
	}
};

const run = () => {
	const appsToRun = args._[0];

	if (appsToRun) {
		switch (appsToRun) {
			case "all":
				runAllApps();
				break;

			case "all-services":
				runAllServices();
				break;

			default:
				const app = appsPaths[appsToRun];
				if (app) runApp(appsToRun);
				else console.log("App not found");
				break;
		}
	} else {
		console.log("Please specify the apps to run");
	}
};

run();
