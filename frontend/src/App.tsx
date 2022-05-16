import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { MyBookingsPage } from "./pages/MyBookingsPage/MyBookingsPage";

function App() {
	return (
		<div>
			<Header />

			<MyBookingsPage />

			<Footer />
		</div>
	);
}

export default App;
