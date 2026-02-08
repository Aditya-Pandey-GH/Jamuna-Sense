import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Jamuna_Sense_Logo.png";
import ReportButton from "../ReportButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Jamuna Sense Logo" />
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/knowyouryamuna">Know Your Yamuna</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/impact">Impact</Link>
        </li>

        {/* Report Button inside menu (mobile friendly) */}
        {/* <li className="mobile-report" onClick={() => setMenuOpen(false)}>
          <Link to="/reportForm">
            <ReportButton />
          </Link>
        </li> */}
      </ul>

      {/* Desktop Report Button */}
      <div className="desktop-report">
        <Link to="/reportForm">
          <ReportButton />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
