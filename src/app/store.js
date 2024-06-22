import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import authReducer from "../features/auth/AuthSlice";
import cartReducer from "../features/cart/CartSlice";
import orderReducer from "../features/order/OrderSlice";
import userReducer from "../features/User/UserSlice";
import popularProductsReducer from "../features/home/extra slices/PopularProductsSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    popularProducts: popularProductsReducer,
  },
});
