import React from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart = [] } = useSelector((state) => state.cart || {});
  const dispatch = useDispatch();

  // ✅ SAFE ADD TO CART
  const addToCartHandler = (item) => {
    if (!item) return;

    const isItemExists = cart.find((i) => i._id === item._id);

    if (isItemExists) {
      toast.error("Item already in cart");
      return;
    }

    if ((item?.stock || 0) < 1) {
      toast.error("Product stock limited");
      return;
    }

    const cartData = { ...item, qty: 1 };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart successfully");
  };

  // ✅ PREVENT CRASH IF DATA IS MISSING
  if (!data) return null;

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "" : "mb-12"
      } lg:flex p-2`}
    >
      {/* IMAGE SECTION */}
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={data?.images?.[0]?.url || "/placeholder.png"}
          alt={data?.name || "event"}
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center p-4">
        <h2 className={styles.productTitle}>
          {data?.name || "No Name"}
        </h2>

        <p className="text-justify mb-4">
          {data?.description || "No description available"}
        </p>

        {/* PRICE */}
        <div className="flex py-2 justify-between items-center mb-4">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice || 0}$
            </h5>

            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice || 0}$
            </h5>
          </div>

          <span className="p-3 font-[400] text-[17px] text-[#44845e]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        {/* COUNTDOWN */}
        <CountDown data={data} />

        <br />

        {/* ACTION BUTTONS */}
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>
              See Details
            </div>
          </Link>

          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};


export default EventCard;
