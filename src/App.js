import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import ProtectedRoute from "./ProtectedRoute.js";
import {ShopHomePage} from "./ShopRoute.js"
import SellerProtectedRoute from "./SellerProtectedRoute.js";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSeller, seller } = useSelector((state) => state.seller);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        } />
        {/* shop route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop/:id" element={
          <SellerProtectedRoute
          isSeller={isSeller}
          >
            <ShopHomePage/>
          </SellerProtectedRoute>
        } />
      </Routes>

      <ToastContainer position="bottom-center" autoClose={5000} theme="dark" />
    </>
  );
};

export default App;