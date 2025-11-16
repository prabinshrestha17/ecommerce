import { Route, Routes } from "react-router";
import About from "../components/About";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Landing from "../components/common/page";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default MainRoutes;
