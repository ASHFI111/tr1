import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            return state.filter((item, index) => index !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { index, newQuantity } = action.payload;
            if (newQuantity <= 0) {
                return state.filter((item, i) => i !== index);
            }
            state[index].quantity = newQuantity;
        },
    }
})

export const { addToCart, removeFromCart, updateQuantity } = cartReducer.actions;
export default cartReducer.reducer;