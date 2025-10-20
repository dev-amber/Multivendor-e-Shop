import React, { useState } from 'react'
import {RxCross1} from "react-icons/rx"
import {IoBagHandleOutline} from "react-icons/io5"
import styles from '../../styles/style'
import {Link} from "react-router-dom"
import {BsCartPlus} from "react-icons/bs"
import { AiOutlineHeart } from 'react-icons/ai'

const Wishlist = ({setOpenWishlist}) => {

    const cartData=[
        {
            name:"Iphone 14 pro max 256 gb ssd and 8db ram silver color",
            description: "test",
            price:"999",
        },
         {
            name:"Iphone 14 pro max 256 gb ssd and 8db ram silver color",
            description: "test",
            price:"245",
        },
         {
            name:"Iphone 14 pro max 256 gb ssd and 8db ram silver color",
            description: "test",
            price:"645",
        },
    ]
  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
      <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex  flex-col justify-between shadow-sm'>
        <div>
        <div className='flex w-full justify-end pr-5 pt-5 '>
           <RxCross1
           size={25}
           className="cursor-pointer"
           onClick={()=> setOpenWishlist(false)}
           />
        </div>

        {/*Item length */}
        <div className={`${styles.noramlFlex} p-4`}>
           <AiOutlineHeart size={25} />
           <h5 className='pl-2 text-[20px] font-[500]'>
            3 items
           </h5>
        </div>
        {/* cart single item */}
        <br/>
        <div className='w-full border-t'>
          {
            cartData && cartData.map((i,index)=>(
                <CartSingle key={index} data={i} />
            ))
          }
        </div>
       </div>
      </div>
    </div>
  )
}


const CartSingle=({data})=>{
   const[value,setValue]=useState(1);
   const totalPrice=data.price * value;

  return(
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        <RxCross1 className='cursor-pointer' />
         <img src='https://up.yimg.com/ib/th/id/OIP.kURbkxXXTWqvU92t-iYKvAHaJ4?pid=Api&rs=1&c=1&qlt=95&w=82&h=109'
        className='w-[80px] h-[80px] ml-4'
       />
      
       <div className='pl-[5px]'>
        <h1>{data.name}</h1>
        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
          US${totalPrice}
        </h4>
       </div>
       <div className=''>
          <BsCartPlus size={20} className="cursor-pointer" title="Add to cart"/>
       </div>
      </div>

    </div>
  )
       
}

export default Wishlist