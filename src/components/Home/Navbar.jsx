import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Jamuna_Sense_Logo.png";
import ReportButton from "../ReportButton";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/knowyouryamuna">Know Your Yamuna</Link>
        </li>
        <li>
          <Link to="/impact">Impact</Link>
        </li>
      </ul>
          <Link to="/reportForm">
            <ReportButton />
          </Link>
    </nav>
  );
};

export default Navbar;
