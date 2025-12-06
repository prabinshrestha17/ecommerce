import { Route, Routes } from "react-router";
import About from "../components/About";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Landing from "../components/common/page";
import ProductsPage from "../components/products/page";
import Men from "../pages/men/men";
import NotFound from "../components/Notfound";
import ProductDetails from "../pages/men/ProductDetails";
import CartPage from "../components/cart/page";
import Login from "../pages/auth/Login/LoginIn";
import Signup from "../pages/auth/Signup/Signup";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/men/:id" element={<ProductDetails />} />
        <Route path="/mycart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default MainRoutes;
