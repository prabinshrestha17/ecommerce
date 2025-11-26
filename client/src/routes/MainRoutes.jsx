import { Route, Routes } from "react-router";
import About from "../components/About";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Landing from "../components/common/page";
import ProductsPage from "../components/products/page";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default MainRoutes;
