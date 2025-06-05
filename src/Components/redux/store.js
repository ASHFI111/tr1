import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "../../Components/redux/cartSlice.js"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        
    }
})

export default store