import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import ComponentsPage from "./pages/ComponentsPage";
import Guide from "./pages/Guide";
import BuildYourPc from "./pages/BuildYourPc";
import IntelBuild from "./pages/IntelBuild";
import RyzenBuild from "./pages/RyzenBuild";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/buildyourpc" element={<BuildYourPc />} />
        <Route path="/intel-build" element={<IntelBuild />} />
        <Route path="/ryzen-build" element={<RyzenBuild />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
