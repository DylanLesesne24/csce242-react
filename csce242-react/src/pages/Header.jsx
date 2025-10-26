import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <header>

      <div className="header-top">
        <img id="main-logo" src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="Logo" />
        <h1>We Build PCs!</h1>


        <button
          id="toggle-nav"
          onClick={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

     
      <nav id="main-nav" className={open ? "open" : ""}>
        <ul id="nav-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/components">Components</Link></li>
          <li><Link to="/guide">Guide</Link></li>
          <li><Link to="/buildyourpc">Build Your PC</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
