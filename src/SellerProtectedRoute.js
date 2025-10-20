import React from 'react'
import { Navigate } from 'react-router-dom';

const SellerProtectedRoute = ({isSeller,children, seller}) => {
 if(!isSeller){
    return <Navigate to={`/`} replace/>
 }
     
  console.log("👩‍💼 Seller data from store:", seller);
  return children
  
}

export default SellerProtectedRoute