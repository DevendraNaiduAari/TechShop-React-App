import React, { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import productsData from "./ProductList";
import { useDispatch } from "react-redux";
import { add } from './redux/ProductListReducer'
import reviewsData from "./reviewsData";
import { Link } from "react-router-dom"

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(product?.images[0]);
    const [activeButton, setActiveButton] = useState('specifications');
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        const foundProduct = productsData.find((item) => item.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedImage(foundProduct.images?.[0] || null);
        } else {
            setProduct(null);
        }
    }, [id]);

    if (!product) {
        return <h2 style={{ color: "white", textAlign: "center" }}>Product not found!</h2>;
    }

    const handleAdd = (product) => {
        dispatch(add(product))
    };
    const renderStars = (rateCount) => {
        const starArray = [1, 2, 3, 4, 5];
        return starArray.map((star, index) => (
            <span key={index} className={index < rateCount ? "text-warning" : "text-black"}>★</span>
        ));
    };

    const relatedProducts = productsData.filter(
        (item) => item.category === product.category && item.id !== product.id
    );
    
    const totalProducts = relatedProducts.length;
    const chunkedProducts = [];
    for (let i = 0; i < totalProducts; i+=4) {
        chunkedProducts.push(relatedProducts.slice(i, i + 4));
    }

    const handleIndicatorClick = (index) => {
        setCurrentPage(index);
    };
    return (
        <div className="bg-dark text-white" style={{ minHeight: "100vh", padding: "20px" }}>
            <div className="py-3">
                <div className="row">
                    <div className="col-12 col-md-8 d-flex flex-row">
                        <div className="d-flex flex-column me-5 mb-md-0">
                            {product.images.map((img, index) => (
                                <img key={index} src={img} alt={`${product.title}-${index}`} className={`img-thumbnail mb-2 ${selectedImage === img ? "border border-white" : "border border-secondary"}`}
                                    style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover", backgroundColor: "black", marginLeft: "40px" }} onClick={() => setSelectedImage(img)} />
                            ))}
                        </div>
                        <div className="d-flex justify-content-center flex-grow-1">
                            <img src={selectedImage} alt={product.title} className="img-fluid"
                                style={{ maxHeight: "650px", objectFit: "contain" }} />
                        </div>
                    </div>
                    <div className="col-md-4 text-start">
                        <h2 className="mb-1 fs-1">{product.title}</h2>
                        <p className="text-white fs-5">{product.info}</p>
                        <div className="d-flex">
                            <span className="text-danger me-2 fs-4">{"★".repeat(product.rateCount)}{"☆".repeat(5 - product.rateCount)}</span>
                            <span className="mt-2 fs-6 text-secondary">| {product.ratings} Ratings</span>
                        </div>
                        <hr className="mt-4 mb-4" />
                        <div class="d-flex">
                            <h2 class="text-white fs-1">₹{product.finalPrice}</h2>
                            <p class="text-decoration-line-through text-secondary mt-1 ms-3 fs-3">₹{product.originalPrice}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="text-success mb-0 fs-5">You save: ₹{product.originalPrice - product.finalPrice} ({Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100)}%)</p>
                            <span className="badge bg-success text-white d-inline-block px-1 py-2 fs-6 me-5" style={{ minWidth: "110px", textAlign: "center" }}>✓ In Stock</span>
                        </div>
                        <p class="text-secondary">(Inclusive of all taxes)</p>
                        <hr className="mt-4 mb-4" />
                        <h5 className="mt-4 mb-4">Offers and Discounts</h5>
                        <div className="d-flex flex-wrap gap-3 mb-4">
                            <div className="px-2 py-2 border border-secondary rounded text-light"
                                style={{ minWidth: "200px", textAlign: "start" }}>No Cost EMI on Credit Cards
                            </div>
                            <div className="px-2 py-2 border border-secondary rounded text-light"
                                style={{ minWidth: "200px", textAlign: "start" }}>Pay Later & Cashback Offers
                            </div>
                        </div>
                        <hr className="mt-4 mb-4" />
                        <div>
                            <button className="btn btn-danger btn-lg d-block mt-4 w-50" onClick={() => handleAdd(product)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-4 p-3 mt-4">
                    <button className={`btn1 ${activeButton === 'specifications' ? 'active' : ''}`}
                        onClick={() => setActiveButton('specifications')}
                    >Spacifications</button>
                    <button className={`btn1 ${activeButton === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveButton('overview')}
                    >Overview</button>
                    <button className={`btn1 ${activeButton === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveButton('reviews')}
                    >Reviews</button>
                </div>
                <div className="mt-4">
                    {activeButton === "specifications" && (
                        <div className="mt-4">
                            <div className="d-flex flex-column" style={{ lineHeight: '3', marginLeft: '15px', maxWidth: '450px' }}>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Brand</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>{product.brand}</span>
                                </div>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Model</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>{product.title}</span>
                                </div>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Generic Name</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>{product.category}</span>
                                </div>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Headphone Type</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>{product.type}</span>
                                </div>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Connectivity</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>{product.connectivity}</span>
                                </div>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <span className="text-secondary text-start" style={{ minWidth: '150px' }}>Microphone</span>
                                    <span className="fw-bold" style={{ marginLeft: 'auto' }}>Yes</span>
                                </div>
                            </div>
                        </div>

                    )}
                    {activeButton === "overview" && (
                        <div className="mt-4">
                            <h4 className="fw-bold mb-3 text-start">
                                The <span className="text-danger">{product.title}</span> {product.info} provides with fabulous sound quality
                            </h4>
                            <ul style={{ lineHeight: "2" }} className="fs-5">
                                <li className="text-start">Sound Tuned to Perfection</li>
                                <li className="text-start">Comfortable to Wear</li>
                                <li className="text-start">Long Hours Playback Time</li>
                            </ul>
                            <div>
                                <p className="text-start fs-5" >
                                    Buy the
                                    <strong> {product.title} {product.info} </strong>
                                    which offers you with fabulous music experience by providing you with awesome sound quality that you can never move on from.
                                    Enjoy perfect flexibility and mobility with amazing musical quality with these Neckbands giving you a truly awesome audio experience.
                                    It blends with exceptional sound quality and a range of smart features for an unrivalled listening experience.
                                </p>
                            </div>
                        </div>

                    )}
                    {activeButton === 'reviews' && (
                        <div>
                            {reviewsData.map((review, index) => (
                                <div key={index} className=" mb-4 text-start">
                                    <div className="d-flex">
                                        <img
                                            src={review.imageURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="Profile"
                                            className="rounded-circle me-3 object-cover" style={{ height: '60px', }}
                                        />
                                        <div>
                                            <div className="fs-4 fw-bold mb-2">{review.name}</div>
                                            <div className="d-flex mb-2">
                                                <div className="text-danger me-2 fs-5">{"★".repeat(review.rateCount)}</div>
                                                <div className="me-2">|</div>
                                                <div className="fs-5 text-secondary"> {review.date}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fs-5 text-secondary">{review.review}</div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className="bg-dark text-white" style={{ minHeight: "100vh", padding: "20px" }}>
                    <div className="py-4">
                        <div className="mt-5">
                            <h2 className="text-center text-white fw-bold mb-5">Related Products</h2>
                            <div id="relatedProductsCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {chunkedProducts.map((group, groupIndex) => (
                                        <div key={groupIndex} className={`carousel-item ${groupIndex === currentPage ? "active" : ""}`}>
                                            <div className="row">
                                                {group.map((relatedProduct) => (
                                                    <div className="col-lg-3 col-md-4 col-sm-6" key={relatedProduct.id}>
                                                        <div className="card h-100 text-center bg-black text-white" style={{ border: "1px solid lightgray" }}>
                                                            <Link to={`/ProductDetails/${relatedProduct.id}`} className="text-decoration-none">
                                                                <img src={relatedProduct.images[0]} alt={relatedProduct.title} className="card-img-top p-3 img" style={{ height: "250px", objectFit: "contain" }} />
                                                                <div className="text-start fs-3 ms-3">
                                                                    <div>{renderStars(relatedProduct.rateCount)}</div>
                                                                </div>
                                                                <div className="card-body text-start text-white">
                                                                    <h5 className="card-title fw-bold fs-3">{relatedProduct.title}</h5>
                                                                    <p className="text-white">{relatedProduct.info}</p>
                                                                    <hr />
                                                                    <div className="d-flex">
                                                                        <span className="text-white fw-bold fs-2">₹{relatedProduct.finalPrice}</span>
                                                                        <span className="text-decoration-line-through fw-bold text-secondary ms-3 fs-3 mt-1">₹{relatedProduct.originalPrice}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="card-body">
                                                                <button className="btn btn-danger w-100 fs-4" style={{ backgroundColor: "red", borderColor: "red" }} onClick={() => handleAdd(relatedProduct)}>Add to Cart</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="carousel-indicators" style={{position:"relative",top:"50px"}}>
                                    {chunkedProducts.length > 1 &&
                                        chunkedProducts.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleIndicatorClick(index)}
                                                type="button"
                                                data-bs-target="#relatedProductsCarousel"
                                                data-bs-slide-to={index}
                                                className={index === currentPage ? "active" : ""}
                                                aria-current={index === currentPage ? "true" : undefined}
                                                aria-label={`Slide ${index + 1}`}
                                                style={{
                                                    width: "13px",
                                                    height: "13px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "red",
                                                    border: "none",
                                                    margin: "0 5px",
                                                }}
                                            ></button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails