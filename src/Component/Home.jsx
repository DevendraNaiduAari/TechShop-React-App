import React, { useState } from "react";
import productsData from "./ProductList";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { add } from './redux/ProductListReducer'
import products from "./products"

const Home = () => {
  const dispatch = useDispatch()

  const [filter, setFilter] = useState("All");
  const handleFilterChange = (category) => {
    setFilter(category);

  };
  const getFilteredProducts = () => {
    if (filter === "All") {
      return productsData;
    }
    return productsData.filter(product => product.category === filter);
  };
  const renderStars = (rateCount) => {
    const starArray = [1, 2, 3, 4, 5];
    return starArray.map((star, index) => (
      <span key={index} className={index < rateCount ? "text-warning" : "text-black"}>★</span>
    ));
  };
  const handleAdd = (product) => {
    dispatch(add(product))
  }
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators" >
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fff", border: "none", margin: "0 5px" }} ></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fff", border: "none", margin: "0 5px" }} ></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fff", border: "none", margin: "0 5px" }}></button>
        </div>
        <div className="carousel-inner bg-dark">
          <div className="carousel-item active">
            <div className="d-flex align-items-center justify-content-between px-5 m-5" style={{ height: "70vh" }}>
              <div className="text-light text-start">
                <h4 className="fw-bold">boAt Airdopes 131</h4>
                <h2 className="fs-1 fw-bold">Featherweight For Comfort All-Day.</h2>
                <p className="fs-4 mt-4">
                  <span className="text-white fw-bold me-2">₹1,099</span>{" "}
                  <span className="text-secondary text-decoration-line-through">₹2,990</span>
                </p>
                <Link to={`/ProductDetails/3`} className="btn btn-danger btn-lg mt-4">Shop Now</Link>
              </div>
              <div>
                <img src="/images/products/boat131-3.png" className="img-fluid" alt="boAt Airdopes 131" style={{ maxHeight: "550px" }} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex align-items-center justify-content-between px-5 m-5" style={{ height: "70vh" }}>
              <div className="text-light text-start">
                <h4 className="fw-bold">JBL Live 660NC</h4>
                <h2 className="fs-1 fw-bold">Keep The Noise Out ,Or In. You Choose.</h2>
                <p className="fs-4 mt-4">
                  <span className="text-white fw-bold">₹9,999</span>{" "}
                  <span className="text-secondary text-decoration-line-through">₹14,999</span>
                </p>
                <Link to={`/ProductDetails/1`} className="btn btn-danger btn-lg mt-4">Shop Now</Link>
              </div>
              <div>
                <img src="/images/products/jbl660nc-1.png" className="img-fluid" alt="boAt Rockerz 381" style={{ maxHeight: "550px" }} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex align-items-center justify-content-between px-5 m-5" style={{ height: "70vh" }}>
              <div className="text-light text-start">
                <h4 className="fw-bold">Sony WH-XB910N</h4>
                <h2 className="fs-1 fw-bold">Give Your Favourite Music A Boost.</h2>
                <p className="fs-4 mt-4">
                  <span className="text-white fw-bold">₹13,489</span>{" "}
                  <span className="text-secondary text-decoration-line-through">₹19,990</span>
                </p>
                <Link to={`/ProductDetails/7`} className="btn btn-danger btn-lg mt-4">Shop Now</Link>              </div>
              <div>
                <img src="/images/products/sonyXb910n-1.png" className="img-fluid" alt="Sony WH-1000XM4" style={{ maxHeight: "550px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark py-5">
        <h2 className="text-center mb-4 text-light">Featured Products</h2>
        <div className="row justify-content-center g-4 m-0">
          {products.map((product, index) => (
            <div className="col-md-2 col-6 d-flex justify-content-center p-3 image1" key={index}>
              <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none">
                <div className="product-card text-center text-white bg-transparent" style={{ position: "relative", transition: "transform 0.3s ease,z-index 0.3s ease" }}>
                  <p className="mt-5" style={{fontSize:"19px"}}>{product.name}</p>
                  <div className="overflow-hidden">
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </div>
                  <div className="card-body">
                    <p className="fs-5 py-2">
                      {product.price}{" "}
                      <span className="text-secondary text-decoration-line-through">{product.originalPrice}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-dark">
        <div className="header">
          <h1 className="text-white">Top Products</h1>
        </div>
        <div className="filter-buttons d-flex justify-content-center gap-4 p-3 rounded mt-4">
          <button className={`btn1 ${filter === "All" ? "active" : ""}`} onClick={() => handleFilterChange("All")} >All</button>
          <button className={`btn1 ${filter === "Headphones" ? "active" : ""}`} onClick={() => handleFilterChange("Headphones")}>Headphones</button>
          <button className={`btn1 ${filter === "Earbuds" ? "active" : ""}`} onClick={() => handleFilterChange("Earbuds")}>Earbuds</button>
          <button className={`btn1 ${filter === "Earphones" ? "active" : ""}`} onClick={() => handleFilterChange("Earphones")}>Earphones</button>
          <button className={`btn1 ${filter === "Neckbands" ? "active" : ""}`} onClick={() => handleFilterChange("Neckbands")}>Neckbands</button>
        </div>
        <div className="container py-4 mt-4" style={{ maxWidth: "1400px" }}>
          <div className="row g-4">
            {getFilteredProducts().map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                <div className="card h-100 text-center bg-black text-white" style={{ border: "1px solid lightgray" }}>
                  <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none">
                    <img src={product.images[0]} alt={product.title} className="card-img-top p-3 img" />
                    <div className="text-start fs-3 ms-3" >
                      <div>{renderStars(product.rateCount)}</div>
                    </div>
                    <div className="card-body text-start text-white">
                      <h5 className="card-title fw-bold fs-3">{product.title}</h5>
                      <p className="text-white">{product.info}</p>
                      <hr />
                      <div className="d-flex">
                        <span className="text-white fw-bold fs-2 "> ₹{product.finalPrice} </span>
                        <span className="text-decoration-line-through fw-bold text-secondary ms-3 fs-3 mt-1"> ₹{product.originalPrice} </span>
                      </div>
                    </div>
                  </Link>
                  <div className="card-body">
                    <button className="btn btn-danger w-100 fs-4" style={{ backgroundColor: "red", borderColor: "red" }} onClick={() => handleAdd(product)}>Add to cart</button>
                  </div>
                </div>
              </div>
            )).slice(0, 11)}
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-end">
              <div className="card w-100 h-100 bg-black" style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link to="/All_Products" className=" w-75 fs-3 text-white fw-bold" style={{ maxWidth: "200px", textDecoration: "none" }}>
                  Browse All Products <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
