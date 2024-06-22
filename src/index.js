import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Logout from "./features/auth/components/Logout";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import PageNotFound from "./pages/404";
import AdminHomePage from "./pages/AdminHomePage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminProductPage from "./pages/AdminProductPage";
import Cart from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/admin-product"
          element={
            <ProtectedAdmin>
              <AdminProductPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminHomePage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/product-form"
          element={
            <ProtectedAdmin>
              <AdminProductFormPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrdersPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/product-form/edit/:id"
          element={
            <ProtectedAdmin>
              <AdminProductFormPage></AdminProductFormPage>
            </ProtectedAdmin>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <CheckoutPage />
            </Protected>
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/orders"
          element={
            <Protected>
              <UserOrdersPage />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <UserProfilePage />
            </Protected>
          }
        />
        <Route
          path="/order-success/:id"
          element={
            <Protected>
              <OrderSuccessPage />
            </Protected>
          }
        />
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
