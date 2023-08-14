import React from "react";
import img from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <img
          src={img}
          className="App-logo"
          alt=""
          height="36"
          class="d-inline-block align-top"
        ></img>
      </a>
    </nav>
  );
};

export default Navbar;
