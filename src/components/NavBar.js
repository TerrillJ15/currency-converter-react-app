import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img
          src={img}
          className="App-logo"
          alt=""
          height="36"
          class="d-inline-block align-top"
        ></img>
      </Link>
    </nav>
  );
};

export default Navbar;
