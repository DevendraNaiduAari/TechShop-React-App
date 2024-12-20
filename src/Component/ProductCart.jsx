import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "./redux/ProductListReducer";

const ProductCart = () => {
    const dispatch = useDispatch();
    const ProductListData = useSelector((state) => state.ProductListData);

    const calculateOriginalPrice = () =>
        ProductListData.reduce(
            (acc, item) => acc + item.originalPrice * item.quantity, 0
        );
    const calculateDiscount = () =>
        ProductListData.reduce(
            (acc, item) =>
                acc + (item.originalPrice - item.finalPrice) * item.quantity, 0
        );
    const calculateTotal = () =>
        ProductListData.reduce(
            (acc, item) => acc + item.finalPrice * item.quantity, 0
        );

    return (
        <div className="bg-dark text-white">
            <div className="container py-5" style={{ maxWidth: "1350px" }}>
                <div className="row g-4">
                    {ProductListData && ProductListData.length > 0 ? (
                        <>
                            <div className="col-md-8" data-bs-spy="scroll"
                                style={{ height: "550px", overflowY: ProductListData.length > 2 ? "auto" : "hidden", scrollbarColor: "#4d4d4d #1c1c1c" }}>
                                <div className="p-4 bg-black rounded ">
                                    {ProductListData.map((product) => (
                                        <div key={product.id} className="d-flex align-items-start border-bottom border-secondary py-4">
                                            <img src={product.images[0]} alt={product.name} className="rounded me-3" style={{ width: "190px", height: "190px", objectFit: "cover", }} />
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className=" fs-3 text-start">{product.title} {product.info}</span>
                                                    <button className="btn text-danger" onClick={() => dispatch(removeItem(product.id))}><i className="bi bi-trash fs-4"></i></button>
                                                </div>
                                                <div className="d-flex align-items-center mt-3">
                                                    <span className="text-white fs-3">₹{product.finalPrice}</span>
                                                    <span className="text-decoration-line-through text-secondary ms-3 fs-3">₹{product.originalPrice}</span>
                                                </div>
                                                <div className="d-flex justify-content-start align-items-center mt-4">
                                                    <button className="btn btn-outline-secondary btn-sm text-white px-3" style={{ borderRadius: "0" }} onClick={() => dispatch(decreaseQuantity(product.id))}> - </button>
                                                    <span className=" text-danger fs-5 border-none px-3 bg-black">{product.quantity}</span>
                                                    <button className="btn btn-outline-secondary btn-sm text-white px-3" style={{ borderRadius: "0" }} onClick={() => dispatch(increaseQuantity(product.id))}> + </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-4 bg-black rounded">
                                    <h5 className="mb-5 fs-4">Order Summary ({ProductListData.length} items)</h5>
                                    <div className="d-flex justify-content-between mb-3 fs-5">
                                        <span>Original Price</span>
                                        <span>₹{calculateOriginalPrice()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 fs-5">
                                        <span >Discount</span>
                                        <span className="text-success">-₹{calculateDiscount()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 fs-5">
                                        <span>Delivery</span>
                                        <span className="text-success">Free</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-5 fs-5">
                                        <span>Total Price</span>
                                        <span>₹{calculateTotal()}</span>
                                    </div>
                                    <button className="btn btn-danger btn-block w-100">Checkout</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className=" bg-dark">
                            <div className="cart-icon mb-3">
                                <i className="bi bi-cart-x" style={{ fontSize: "200px", color: "red" }}></i>
                            </div>

                            <h2 className="mb-3">Your Cart is Empty</h2>

                            <a href="/home" className="btn btn-danger text-white">Start Shopping</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductCart;