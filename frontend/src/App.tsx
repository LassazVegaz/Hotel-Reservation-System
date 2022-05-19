import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import { Notification } from "./components/Notification/Notification";
import { UserRole } from "./enums/user-role.enum";
import { useAppSelector } from "./hooks/redux.hooks";
import { useUsersApi } from "./hooks/users-api.hook";
import { BookingPage } from "./pages/BookingPage/BookingPage";
import { CreateAccountPage } from "./pages/CreateAccountPage/CreateAccountPage";
import { HotelsListPage } from "./pages/HotelsListPage/HotelsListPage";
import { HotelViewPage } from "./pages/HotelVewPage/HotelViewPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MyBookingsPage } from "./pages/MyBookingsPage/MyBookingsPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
	const isLoading = useAppSelector((s) => s.loader.isLoading);
	const authData = useAppSelector((s) => s.auth);
	const { refreshAuthtore } = useUsersApi();

	useEffect(() => {
		refreshAuthtore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />

			<Notification />

			<Routes>
				{!authData && (
					<>
						<Route path="/" element={<CreateAccountPage />} />
						<Route path="/login" element={<LoginPage />} />
					</>
				)}

				{authData && (
					<>
						{authData.roleId === UserRole.Customer && (
							<>
								<Route path="/" element={<MyBookingsPage />} />
								<Route
									path="/book/:id"
									element={<BookingPage />}
								/>
							</>
						)}
						{authData.roleId !== UserRole.Customer && (
							<Route
								path="/"
								element={<Navigate to="/hotels" replace />}
							/>
						)}
						<Route path="/hotels" element={<HotelsListPage />} />
						<Route path="/hotels/:id" element={<HotelViewPage />} />
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
