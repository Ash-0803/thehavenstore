import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/UserSlice";
import authReducer from "../features/auth/AuthSlice";
import cartReducer from "../features/cart/CartSlice";
import popularProductsReducer from "../features/home/extra slices/PopularProductsSlice";
import globalReducer from "../features/home/extra slices/commonSlice";
import orderReducer from "../features/order/OrderSlice";
import productReducer from "../features/product/ProductSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
  popularProducts: popularProductsReducer,
  global: globalReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
