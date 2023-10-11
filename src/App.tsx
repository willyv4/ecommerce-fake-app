import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductView from "./components/ProductView";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<br />
			<Routes>
				<Route path="/products" element={<ProductList />} />
				<Route path="/products/:id" element={<ProductView />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
