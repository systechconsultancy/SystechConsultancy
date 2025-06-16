import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop"
import Layout from "../layouts/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Career from "../pages/Career";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Counselling from "../pages/Counselling";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/services" element={<Services />} />
          <Route path="/counselling" element={<Counselling/>} />
          <Route path="/Contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;