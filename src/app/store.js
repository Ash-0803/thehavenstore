import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/UserSlice";
import authReducer from "../features/auth/AuthSlice";
import cartReducer from "../features/cart/CartSlice";
import popularProductsReducer from "../features/home/extra slices/PopularProductsSlice";
import globalReducer from "../features/home/extra slices/commonSlice";
import orderReducer from "../features/order/OrderSlice";
import productReducer from "../features/product/ProductSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    popularProducts: popularProductsReducer,
    global: globalReducer,
  },
});
