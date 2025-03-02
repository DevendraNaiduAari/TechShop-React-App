import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "./ProductListReducer";
const store=configureStore({
    reducer:{
        ProductListData:ProductListReducer
    }
})
export default store