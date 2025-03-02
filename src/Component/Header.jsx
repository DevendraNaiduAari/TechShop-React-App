import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "./ProductList";
import { useSelector } from "react-redux";
import "./Home.css";

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);
    const [showSign, setShowSign] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);
    const signInRef = useRef(null);
    const navigate = useNavigate();

    const ProductListData = useSelector((state) => state.ProductListData);

    const totalCartItems = ProductListData.length;

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        setShowSignIn(false);
        setShowLogIn(false);
        setShowSign(false);
    };

    const toggleSignIn = () => {
        setShowSignIn((prev) => !prev);
        setShowSearch(false);
        setShowLogIn(false);
        setShowSign(false);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearch(false);
        }
        if (signInRef.current && !signInRef.current.contains(event.target)) {
            setShowSignIn(false);
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
            setShowSignIn(false);
            setShowLogIn(false);
            setShowSign(false);
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
                    <Link to="/Home" className="navbar-brand fs-2"><b>Tech-Shop</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav d-flex ms-auto me-3">
                            <button className={`btn btn-none ${showSearch ? "text-primary" : ""}`} onClick={toggleSearch} title="Search">
                                <i className="bi bi-search fs-5 text-white"></i>
                            </button>
                            <Link to="/ProductCart" className="nav-link" title="Cart">
                                <button className="btn btn-none text-white"><i className="fa-solid fa-cart-shopping"></i>
                                    {totalCartItems > 0 && (
                                        <span className="position-relative" style={{ bottom: "15px" }}>
                                            {totalCartItems}
                                        </span>
                                    )}
                                </button>
                            </Link>
                            <button className="btn btn-none" onClick={toggleSignIn} title="Sign In"><i className="bi bi-person fs-5 text-white"></i></button>
                        </div>
                    </div>
                </div>
            </nav>
            {showSearch && (
                <div ref={searchRef} className="position-absolute w-100 d-flex justify-content-center" style={{ top: "80px", zIndex: "1000" }}>
                    <div className="position-relative w-50">
                        <input type="text" className="form-control pe-5" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
                        {searchTerm && (
                            <button className="btn btn-sm btn-link text-white position-absolute end-0 me-2" onClick={handleClearSearch} style={{ textDecoration: "none", top: "5px" }}>✖</button>
                        )}
                        {suggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100 mt-1 text-start" style={{ maxHeight: "350px", overflowY: "auto", backgroundColor: "#fff", }}>
                                {suggestions.map((product) => (
                                    <li key={product.id} className="list-group-item bg-dark text-white" onClick={() => handleSuggestionClick(product.id)} style={{ cursor: "pointer" }}>{product.title}</li>
                                ))}
                            </ul>
                        )}
                        {suggestions.length === 0 && searchTerm.trim() !== "" && (
                            <div className="text-center text-muted mt-1"
                                style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px" }}>No products found
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showSignIn && (
                <div ref={signInRef} className="position-absolute text-white bg-dark p-3 rounded border border-secondary shadow text-start"
                    style={{ top: "75px", right: "20px", zIndex: "1000", minWidth: "250px", }}>
                    <h5 className="text-secondary">Hello!</h5>
                    <p className="mb-2 text-secondary">Access account and manage orders</p>
                    <button className="btn w-60 text-secondary mb-2 rounded border border-secondary shadow" onClick={() => {setShowLogIn(true);setShowSignIn(false);}}>Login / Signup</button>
                    <hr />
                    <p className="text-secondary mb-0">Please Login</p>
                </div>
            )}
            {showLogIn && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: "1050" }}>
                    <div className="bg-dark text-white rounded p-4" style={{ width: "450px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", height: "510px" }}>
                        <p className="text-white w-100 text-end" onClick={() => setShowLogIn(false)} style={{ cursor: "pointer" }}>X</p>
                        <h2 className="fw-bold text-start">Login</h2>
                        <h5 className="text-start mb-4 text-secondary">New to Tech-Shop? <span onClick={() => {setShowSign(true);setShowLogIn(false);}} style={{ cursor: "pointer",color:"white" }}>Create an account</span></h5>
                        <input type="email" className="form-control mb-4 py-2" placeholder="Email" />
                        <input type="password" className="form-control mb-4 p-2" placeholder="Password" />
                        <button className="btn btn-danger w-100 mb-4 p-2">Login</button>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <hr style={{ flex: 1 }} className="me-2" />
                            <div className="text-secondary me-2">Or login with</div>
                            <hr style={{ width: "40%" }} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary flex-grow-1 rounded-0 mx-1">Facebook</button>
                            <button className="btn btn-danger flex-grow-1 rounded-0 mx-1">Google</button>
                            <button className="btn btn-info flex-grow-1 rounded-0 mx-1">Twitter</button>
                        </div>
                    </div>
                </div>
            )}
            {showSign && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: "1050" }}>
                    <div className="bg-dark text-white rounded p-4" style={{ width: "450px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", height: "630px" }}>
                        <p className="text-white w-100 text-end" onClick={() => setShowSign(false)} style={{ cursor: "pointer" }}>X</p>
                        <h2 className="fw-bold text-start">Signup</h2>
                        <h5 className="text-start text-secondary mb-4">Already have an account? <span className="text-white " onClick={() => {setShowLogIn(true);setShowSign(false);}} style={{ cursor: "pointer" }}>Login</span></h5>
                        <input type="name" className="form-control mb-4 py-2" placeholder="username" />
                        <input type="email" className="form-control mb-4 py-2" placeholder="Email" />
                        <input type="password" className="form-control mb-4 p-2" placeholder="Password" />
                        <input type="password" className="form-control mb-4 p-2" placeholder="Confirm Password" />
                        <button className="btn btn-danger w-100 mb-4 p-2">Signup</button>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                            <hr style={{ flex: 1 }} className="me-2" />
                            <div className="text-secondary me-2">Or login with</div>
                            <hr style={{ width: "40%" }} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary flex-grow-1 rounded-0 mx-1">Facebook</button>
                            <button className="btn btn-danger flex-grow-1 rounded-0 mx-1">Google</button>
                            <button className="btn btn-info flex-grow-1 rounded-0 mx-1">Twitter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
