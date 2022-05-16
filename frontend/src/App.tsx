import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { CreateAccountPage } from "./pages/CreateAccountPage/CreateAccountPage";

function App() {
	return (
		<div>
			<Header />

			<Routes>
				<Route path="/" element={<CreateAccountPage />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
