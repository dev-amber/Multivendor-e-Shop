import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/style'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../components/Route/ProductCard/ProductCard'

const ProductPage = () => {
    const [searchParams]=useSearchParams()
    const categoryData=searchParams.get("category"); // caethory have you search product in it
    const [data,setData]=useState([]);
    {/* this is not filterd  diff of product nad best   // sold filter selling*/}

    useEffect(()=>{
        if(categoryData === null){
            const d=productData && productData.sort((a,b) => a.total_sell - b.total_sell)
            setData(d);
        }else{
            const d=productData && productData.filter((i) => i.category === categoryData)
            setData(d);
        }
    },[])

  return (
    <div>
        <Header activeHeading={3}/>
        <br/>
        <br/>
        <div className={`${styles.section}`}>
            <div className='grid  grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {
                data && data.map((i,index)=> <ProductCard data={i}  key={index}/>)}
            </div>

            {
                data && data.length === 0  ? (
                    <h1 className='text-center w-full pb-[100px] text-[20px]'>          
                        No products Found!     {/* // make bcz if not any product show msg*/}
                    </h1>           
                ) : null
            }


        </div>

    </div>
  )
}

export default ProductPage