import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductView from "./components/ProductView";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
