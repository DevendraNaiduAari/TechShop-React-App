import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <Link to="/Home" className="navbar-brand fs-2">
            <b>Tech-Shop</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav d-flex ms-auto me-3">
              <a className="mt-2" title="Search"><i className="bi bi-search fs-5 text-white"></i></a>
              <Link to="/ProductCart" className="nav-link" title="Cart">
                <i className="bi bi-cart fs-5 text-white" style={{ marginRight: "30px", marginLeft: "30px" }}></i>
              </Link>
              <a className="nav-link" href="#" title="Sign In" ><i className="bi bi-person fs-5 text-white"></i></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
