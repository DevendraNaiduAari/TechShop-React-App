import React, { useState } from "react";
import { Link } from "react-router-dom"
import productsData from "./ProductList";
import { useDispatch } from "react-redux";
import { add } from './redux/ProductListReducer'
import {brandsMenu, categoryMenu } from "./filterBarData";

const AllProducts = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000)

  const renderStars = (rateCount) => {
    const starArray = [1, 2, 3, 4, 5];
    return starArray.map((star, index) => (
      <span key={index} className={index < rateCount ? "text-warning" : "text-black"}>★</span>
    ));
  };
  const handleAdd = (product) => {
    dispatch(add(product))
  };
  const clearFilters = () => {
    setSelectedOption("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(20000);
  };
  const brandChange = (brand) => {
    setSelectedBrands((prevState) => {
      if (prevState.includes(brand)) {
        return prevState.filter((item) => item !== brand);
      } else {
        return [...prevState, brand];
      }
    });
  };
  const categoryChange = (category) => {
    setSelectedCategories((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  };
  const filterProducts = (products) => {
    
    if (selectedBrands.length > 0) {
      products = products.filter((product) =>
        selectedBrands.some((brand) => brand.toLowerCase() === product.brand.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      products = products.filter((product) => selectedCategories.includes(product.category));
    }
    if (selectedOption === "latest") {
      return products.sort((a, b) => b.id - a.id).slice(0, 6);
    }
    else if(selectedOption==="featured"){
      return products.filter((product)=>product.tag==="featured-product").sort((a, b) => a.id - b.id)
    }
    else if (selectedOption === "topRated") {
      return products.filter((product) =>product.rateCount >4).sort((a, b) => b.rateCount - a.rateCount);
    }
    else if (selectedOption === "lowest") {
      return products.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    else if (selectedOption === "Height") {
      return products.sort((a, b) => b.finalPrice - a.finalPrice);
    }
    products = products.filter((product) => product.finalPrice >= minPrice && product.finalPrice <= maxPrice);
    return products;
  }
  const sortedProducts = filterProducts([...productsData])
  const filtersApplied =
    selectedOption ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    minPrice > 0 ||
    maxPrice < 20000;
  return (
    <div className="container-fluid bg-dark text-light p-4">
      <div className="row">
        <aside className="col-md-2" style={{ maxHeight: "80vh", overflowY: "auto", scrollbarColor: "#4d4d4d #1c1c1c" }}>
          {filtersApplied && (
            <button className="btn btn-light mt-4" onClick={clearFilters} style={{ width: "170px", background: "red", border: "red", color: "white" }}>Clear Filters</button>
          )}
          <h3 className="text-white text-start mt-4">Sort By</h3>
          <hr />
          <ul className="list-unstyled text-start fs-5">
            <li className={`bg-dark py-1 ${selectedOption === "latest" ? "text-danger" : "text-light"}`} onClick={() => setSelectedOption("latest")} style={{ cursor: "pointer" }}> Latest </li>
            <li className={`bg-dark py-1 ${selectedOption === "featured" ? "text-danger" : "text-light"}`} onClick={() => setSelectedOption("featured")} style={{ cursor: "pointer" }} > Featured </li>
            <li className={`bg-dark py-1 ${selectedOption === "topRated" ? "text-danger" : "text-light"}`} onClick={() => setSelectedOption("topRated")} style={{ cursor: "pointer" }}> Top Rated </li>
            <li className={`bg-dark py-1 ${selectedOption === "lowest" ? "text-danger" : "text-light"}`} onClick={() => setSelectedOption("lowest")} style={{ cursor: "pointer" }} > Price (Lowest First) </li>
            <li className={`bg-dark py-1 ${selectedOption === "highest" ? "text-danger" : "text-light"}`} onClick={() => setSelectedOption("highest")} style={{ cursor: "pointer" }}> Price (Highest First) </li>
          </ul>
          <h3 className="text-white text-start mt-4">Filter By</h3>
          <hr />
          <div>
            <h5 className="d-block text-white text-start fs-4">Brands</h5>
            <ul className="list-unstyled text-start fs-5">
              {brandsMenu.map((brand) => (
                <li key={brand.id} className="bg-dark text-light">
                  <input
                    type="checkbox"
                    id={brand.label.toLowerCase()}
                    className="me-2"
                    onChange={() => brandChange(brand.label)}
                    checked={selectedBrands.includes(brand.label)}
                  />
                  <label htmlFor={brand.label.toLowerCase()}>{brand.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="d-block text-white text-start fs-4">Category</h5>
            <ul className="list-unstyled text-start fs-5">
              {categoryMenu.map((category) => (
                <li key={category.id} className="bg-dark text-light">
                  <input
                    type="checkbox"
                    id={category.label.toLowerCase()}
                    className="me-2"
                    onChange={() => categoryChange(category.label)}
                    checked={selectedCategories.includes(category.label)}
                  />
                  <label htmlFor={category.label.toLowerCase()}>{category.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="d-block text-white text-start">Price</h5>
            <div className="d-flex justify-content-start">
              <label htmlFor="minPrice" className="text-white"> ₹{maxPrice}</label>
            </div>
            <div>
              <input type="range" id="maxPrice" min="0" max="20000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-100" style={{}}/>
            </div>
          </div>
        </aside>
        <main className="col-md-10" >
          <div className="row g-3">
            {sortedProducts.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                <div className="card h-100 text-center bg-black text-white"
                  style={{ border: "1px solid lightgray" }}>
                  <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none">
                    <img src={product.images[0]} alt={product.title} className="card-img-top p-3 img" />
                    <div className="text-start fs-3 ms-3" >
                      <div>{renderStars(product.rateCount)}</div>
                    </div>
                    <div className="card-body text-start text-white">
                      <h5 className="card-title fw-bold fs-4">{product.title}</h5>
                      <p className="text-white">{product.info}</p>
                      <hr />
                      <div className="d-flex">
                        <span className="text-white fw-bold fs-2">₹{product.finalPrice}</span>
                        <span className="text-decoration-line-through fw-bold text-secondary ms-3 fs-3 mt-1">₹{product.originalPrice}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="card-body">
                    <button className="btn btn-danger w-100 fs-4" style={{ backgroundColor: "red", borderColor: "red", }} onClick={() => handleAdd(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
