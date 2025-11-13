import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import ComponentsPage from "./components/ComponentsPage";
import Guide from "./pages/Guide";
import BuildYourPc from "./pages/BuildYourPc";
import Contact from "./pages/Contact";
import IntelBuild from "./pages/IntelBuild";
import RyzenBuild from "./pages/RyzenBuild";
import BuildDetail from "./pages/BuildDetail"; 

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/buildyourpc" element={<BuildYourPc />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/intel-build" element={<IntelBuild />} />
        <Route path="/ryzen-build" element={<RyzenBuild />} />
        <Route path="/builds/:id" element={<BuildDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
