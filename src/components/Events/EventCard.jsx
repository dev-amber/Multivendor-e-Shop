import React from 'react'
import styles from '../../styles/style'
import CountDown from "./CountDown"

const EventCard = ({active}) => {
  return (
     <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
        {/* left side - Image */}
        <div className='w-full lg:w-[50%] m-auto'>
            <img 
                src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' 
                alt='iPhone' 
                className='w-full h-auto object-contain'
            />
        </div>
    {/* right side - Content */}
        <div className='w-full lg:w-[50%] flex flex-col justify-center p-4'>
            <h2 className={`${styles.productTitle}`}>
                Iphone 14 pro max 8/256gb 
            </h2>
            <p className='text-justify mb-4'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            
            {/* price */}
            <div className='flex py-2 justify-between items-center mb-4'>
                <div className='flex items-center'>
                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                        1099$
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                        999$
                    </h5>
                </div>
                <span className='p-3 font-[400] text-[17px] text-[#44845e]'>
                    120 sold 
                </span>
            </div>
         {/* dynamic comp*/}
         <CountDown/>
     </div>
    </div>
  )
}

export default EventCard