import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import { Notification } from "./components/Notification/Notification";
import { useAppSelector } from "./hooks/redux.hooks";
import { CreateAccountPage } from "./pages/CreateAccountPage/CreateAccountPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
	const isLoading = useAppSelector((s) => s.loader.isLoading);
	const authData = useAppSelector((s) => s.auth);

	return (
		<>
			<Header />

			<Notification />

			<Routes>
				{authData && (
					<>
						<Route path="/" element={<CreateAccountPage />} />
						<Route path="/login" element={<LoginPage />} />
					</>
				)}

				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Footer />

			<Loader show={isLoading} />
		</>
	);
}

export default App;
