import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {
    navigate("/");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            {/* Flex Container: Left = Images, Right = Details */}
            <div className="block w-full 800px:flex">
              {/* LEFT SIDE - Product Images */}
              <div className="w-full 800px:w-[50%] flex flex-col items-center">
                <img
                  src={data.image_Url[select].url}
                  alt={data.name}
                  className="w-[70%] mb-4"
                />

                <div className="w-full flex justify-center gap-3">
                  {data.image_Url.map((img, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index ? "border border-gray-400" : ""
                      } cursor-pointer`}
                    >
                      <img
                        src={img.url}
                        className="h-[120px]"
                        onClick={() => setSelect(index)}
                        alt={`thumb-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE - Product Details */}
              <div className="w-full 800px:w-[50%] pl-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="pt-3">{data.description}</p>

                <h4 className={`${styles.productDiscountPrice}`}>
                  {data.discount_price}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.price ? data.price + "$" : null}
                </h3>

                {/* Quantity Controls */}
                <div
                  className={`${styles.noramlFlex} justify-between mt-6 pr-3`}
                >
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      className="bg-gradient-to-r from-teal-400 text-white font-bold rounded-r px-4 py-2"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-white">{count}</span>
                    <button
                      className="bg-gradient-to-r from-teal-400 text-white font-bold rounded-r px-4 py-2"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Wishlist */}
                <div className="mt-5">
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Remove from WishList"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Add to WishList"
                    />
                  )}
                </div>

                {/* Add to Cart Button */}
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                {/* Shop Info */}
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt="shop avatar"
                  />
                  <div className="pr-6">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-5 text-[15px]">
                      {data.shop.ratings} Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} rounded h-11 bg-[#344db1]`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section (Tabs) */}
          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="px-3 800px:px-10 rounded bg-[#f5f6fb] py-2">
      {/* Tab Headers */}
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-[18px] font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>

      {/* Tab Contents */}
      {active === 1 && (
        <p className="py-2 text-[14px] leading-6 pb-10 whitespace-pre-line">
          {data.description}
        </p>
      )}

      {active === 2 && (
        <div className="w-full justify-center max-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block p-5 800px:flex">
          {/* LEFT SIDE */}
          <div className="w-full 800px:w-[50%] pr-5">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full"
                alt="shop"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2 text-[14px]">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum orci nulla, a pharetra eros dapibus eu. Vestibulum ac vestibulum orci. Morbi odio tortor, dictum non gravida eu, pulvinar ac justo. Vestibulum in accumsan risus. Mauris non libero ante. Aenean condimentum blandit augue id placerat. Aliquam quis finibus velit.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full  flex flex-col items-start  ">
            <h5 className="font-[600] pt-2">
              Joined on: <span className="font-[500]">26 Sep, 2025</span>
            </h5>
            <h5 className="font-[600] pt-3">
              Total Products: <span className="font-[500]">1,233</span>
            </h5>
            <h5 className="font-[600] pt-3">
              Total Reviews: <span className="font-[500]">324</span>
            </h5>

            <Link to="/">
              <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}>
                <h4 className="text-white">Visit Shop</h4>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
