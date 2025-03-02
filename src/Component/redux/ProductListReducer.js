import { createSlice } from "@reduxjs/toolkit";

const ProductListSlice = createSlice({
    name: "ProductList",
    initialState: [],
    reducers: {
        add(state, action) {
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity||1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQuantity(state, action) {
            const product = state.find((item) => item.id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const productIndex = state.findIndex((item) => item.id === action.payload);
            if (productIndex !== -1) {
                if (state[productIndex].quantity > 1) {
                    state[productIndex].quantity -= 1;
                } else {
                    state.splice(productIndex, 1);
                }
            }
        },
        removeItem(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, increaseQuantity, decreaseQuantity, removeItem } = ProductListSlice.actions;
export default ProductListSlice.reducer;
