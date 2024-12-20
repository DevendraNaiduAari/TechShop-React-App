import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "./ProductList";
import "./Home.css"

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() !== "") {
      const matches = productsData.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product-details/${id}`);
    setSearchTerm("");
    setSuggestions([]);
    setShowSearch(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <Link to="/Home" className="navbar-brand fs-2">
            <b>Tech-Shop</b>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav d-flex ms-auto me-3">
              <button className={`btn btn-none ${showSearch ? "text-primary" : ""}`}onClick={toggleSearch} title="Search">
                <i className="bi bi-search fs-5 text-white"></i>
              </button>
              <Link to="/ProductCart" className="nav-link" title="Cart">
                <i className="bi bi-cart fs-5 text-white"style={{ marginRight: "30px", marginLeft: "30px" }}></i>
              </Link>
              <button className="btn btn-none"title="Sign In"><i className="bi bi-person fs-5 text-white"></i></button>
            </div>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div ref={searchRef} className="position-absolute w-100 d-flex justify-content-center"style={{ top: "80px", zIndex: "1000" }}>
          <div className="position-relative w-50">
            <input type="text" className="form-control pe-5" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
            {searchTerm && (
              <button className="btn btn-sm btn-link text-white position-absolute top-50 end-0 translate-middle-y me-2"onClick={handleClearSearch}style={{ textDecoration: "none" }}>✖</button>
            )}
            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100 mt-1 text-start" style={{ maxHeight: "350px",overflowY: "auto",backgroundColor: "#fff",}}>
                {suggestions.map((product) => (
                  <li key={product.id} className="list-group-item bg-dark text-white" onClick={() => handleSuggestionClick(product.id)} style={{ cursor: "pointer" }}>{product.title}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Header;
