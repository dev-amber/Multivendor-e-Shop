import React, { useState } from 'react'
import {RxCross1} from "react-icons/rx"
import styles from '../../../styles/style'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'

const ProductDetailsCard = ({setOpen,data}) => {
    const [count,setCount]=useState(1)
    const [click,setClick]=useState(false)
//    const[select,setSelect]=useState(false)

    const handleMessageSubmit=()=>{

    }

    const decrementCount=()=>{
        if(count > 1){
            setCount(count - 1);
        }
    }

     const incrementCount=()=>{
        setCount( count + 1);
    }
  return (
    <div className='bg-[#fff]'>
        {
            data ? (
                <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                <div className='w-[90%] 800px:w-[70%] h-[90vh] overflow-y-scroll 800px:h-[80vh] bg-white rounded-md shadow-sm relative p-4'>
                    <RxCross1 size={30} className="absolute right-3 top-3 z-50 cursor-pointer"
                     onClick={()=> setOpen(false)}
                    />

                    <div className='flex flex-col 800px:flex-row w-full h-full'>
                        {/* Left side - Image */}
                        <div className='w-full 800px:w-[45%] h-full flex flex-col'>
                            <div className='flex-grow flex items-center justify-center'>
                                <img 
                                    src={data.image_Url[0].url} 
                                    alt={data.name} 
                                    className="max-h-[300px] 800px:max-h-[400px] w-auto object-contain"
                                />
                            </div>
                            
                            <div className='flex mt-4'>
                                <img src={data.shop.shop_avatar.url}  className='w-[50px] h-[50px] rounded-full mr-2' alt={data.shop.name}/>
                                <div>
                                    <h3 className={`${styles.shop_name}`}>
                                        {data.shop.name}
                                    </h3>
                                    <h5 className='pb-3 text-[15px]'>
                                        ({data.shop.ratings}) Ratings
                                    </h5>
                                </div>
                            </div>
                            
                            <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 flex items-center justify-center cursor-pointer`}
                                onClick={handleMessageSubmit}
                            >
                                <span className='text-[#fff] flex items-center'>
                                  Send Message <AiOutlineMessage className='ml-1'/>
                                </span>
                            </div>
                            
                            <h5 className='text-[16px] text-[red] mt-5'>
                                ({data.total_sell}) Sold out
                            </h5>
                        </div>

                        {/* Right side - Content */}
                        <div className='w-full 800px:w-[55%] 800px:pl-5 800px:border-l border-gray-200 mt-5 800px:mt-0'>
                            <h1 className={`${styles.productTitle} text-[24px] 800px:text-[28px]`}>
                                {data.name}
                            </h1>
                            <p className='mt-3 text-[15px] 800px:text-[16px]'>{data.description}</p>
                            
                            <div className='flex mt-4'>
                                <h4 className={`${styles.productDiscountPrice} text-[22px]`}>
                                    {data.discount_price}$
                                </h4>
                                <h3 className={`${styles.price} text-[18px] ml-3 line-through`}>
                                    {data.price ? data.price + "$" : null}
                                </h3>
                            </div>

                            <div className='flex items-center mt-8 justify-between'>
                                <div className='flex items-center'>
                                    <span className='mr-3 font-medium'></span>
                                    <div className='flex border border-gray-300 rounded-md'>
                                        <button 
                                           className='bg-gradient-to-r from-teal-400 text-white font-bold rounded-r px-4 py-2' 
                                            onClick={decrementCount}
                                        >
                                            -
                                        </button>
                                        <span className='px-4 py-1 bg-white'>{count}</span>
                                        <button 
                                           className='bg-gradient-to-r from-teal-400 text-white font-bold rounded-r px-4 py-2' 
                                            onClick={incrementCount}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    {click ? (
                                        <AiFillHeart 
                                            size={30}
                                            className='cursor-pointer'
                                            onClick={()=> setClick(!click)}
                                            color={click ? "red" : "#333"}
                                            title='Remove from WishList'
                                        />
                                    ) :  (
                                        <AiOutlineHeart
                                            size={30}
                                            className='cursor-pointer'
                                            onClick={()=> setClick(!click)}
                                            color={click ? "red" : "#333"}
                                            title='Add to WishList'
                                        />
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center justify-center cursor-pointer`}>
                                <span className='text-[#fff] flex items-center'>
                                    Add to Cart  <AiOutlineShoppingCart className='ml-1'/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ProductDetailsCard