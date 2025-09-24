import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage } from './Routes.js'
import { ToastContainer } from 'react-toastify';
import "./App.css"
import { useDispatch } from 'react-redux'; // Added useSelector
import { loadUser } from './redux/actions/user.js';


const App = () => {
  const dispatch = useDispatch();

 useEffect(()=>{
    loadUser(dispatch)
  },[])
    

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignupPage />} />
            <Route path='/activation/:activation_token' element={<ActivationPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
    </>
  );
}; // Added missing closing brace and parenthesis

export default App;