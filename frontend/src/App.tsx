import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { HotelsListPage } from "./pages/HotelsListPage/HotelsListPage";

function App() {
	return (
		<div>
			<Header />

			<HotelsListPage />

			<Footer />
		</div>
	);
}

export default App;
