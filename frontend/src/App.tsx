import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import { useAppSelector } from "./hooks/redux.hooks";
import { CreateAccountPage } from "./pages/CreateAccountPage/CreateAccountPage";

function App() {
	const isLoading = useAppSelector((s) => s.loader.isLoading);

	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<CreateAccountPage />} />
			</Routes>

			<Footer />

			<Loader show={isLoading} />
		</>
	);
}

export default App;
