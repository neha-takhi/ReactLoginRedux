import React from "react";
import { Link } from "react-router-dom";

export const Nav = ({ width, responsiveMenu, openMenu }) => (
  <div
    className={width <= 576 ? `topnav responsive` : `topnav`}
    ref={responsiveMenu}
  >
    <Link to="/home" className="active">
      Home
    </Link>
    <Link to="/dashboard" className="btn btn--dash btn--nav">
      Dashboard
    </Link>
    <Link to="/contract" className="btn btn--dash btn--nav">
      Contract
    </Link>
    <Link to="/other" className="btn btn--dash btn--nav">
      sample Page not found
    </Link>
    <Link to="/login">Logout</Link>
    <div className="menu icon" onClick={openMenu} />
  </div>
);
