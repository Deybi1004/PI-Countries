import React from "react";
import "../Loader/Loader.css";

function Loader() {
  return (
    <div className="wrapper-loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <span>Loading</span>
    </div>
  );
}

export default Loader;
