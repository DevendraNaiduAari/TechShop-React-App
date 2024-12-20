import React from "react";
import {Routes,Route} from 'react-router-dom'
import Home from "../Home";
import ProductDetails from "../ProductDetails";
import ProductCart from "../ProductCart";
import All_Products from "../All-Products";


const Routing=()=>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
            <Route path="/product-details/:id" element={<ProductDetails />}></Route>
            <Route path='/ProductCart' element={<ProductCart/>}/>
            <Route path='/All_Products' element={<All_Products/>}/>
        </Routes>
    )
}
export default Routing