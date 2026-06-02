import React from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart = [] } = useSelector((state) => state.cart || {});
  const dispatch = useDispatch();

  if (!data) return null; // ✅ prevents crash

  const addToCartHandler = (item) => {
    const isItemExists = cart.find((i) => i._id === item?._id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (item?.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        dispatch(addToCart({ ...item, qty: 1 }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      {/* IMAGE (SAFE FIX) */}
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={data?.images?.[0]?.url || "/placeholder.png"}
          alt="event"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={styles.productTitle}>{data?.name}</h2>

        <p>{data?.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="line-through text-[#d55b45] pr-3">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold">
              {data?.discountPrice}$
            </h5>
          </div>

          <span className="text-[#44a55e]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        <CountDown data={data} />

        <div className="flex items-center mt-3">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-white`}>See Details</div>
          </Link>

          <div
            className={`${styles.button} ml-5 text-white`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;