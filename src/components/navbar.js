import React from "react";
import "./navbar.css";

export default function Navbar() {
  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <div className="topnav">
        <a href="/" className="active">
          Home
        </a>
        <div id="myLinks">
          <a href="/fractal">Electricity</a>
        </div>
        <div id="myLinks">
          <a href="/mandelbot">Face Detection Art</a>
        </div>
        <div id="myLinks">
          <a href="/shade">Zig Zag</a>
        </div>
        <div id="myLinks">
          <a href="/patterns">JS Patterns</a>
        </div>
        <div id="myLinks">
          <a href="/polar">Polar Coordinates</a>
        </div>
      </div>
    </div>
  );
}
