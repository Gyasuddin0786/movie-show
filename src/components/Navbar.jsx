import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 fixed-top">
      <Link className="navbar-brand" to="/">🎬 Apna-MovieHub</Link>
    </nav>
  );
}
