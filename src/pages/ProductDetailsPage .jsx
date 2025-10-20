import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/product/ProductDetails"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProduct from "../components/product/SuggestedProduct"

const ProductDetailsPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)

  // helper to slugify product names -> "Iphone 14 ..." => "iphone-14-..."
  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, "-")

  useEffect(() => {
    const product = productData.find(
      (i) => slugify(i.name) === id.toLowerCase()
    )
    setData(product || null)
  }, [id])

  return (
    <div>
      <Header />
      
        <ProductDetails data={data} />
      {
        data && <SuggestedProduct data={data}/>
      }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
