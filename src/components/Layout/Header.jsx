import React, { useState, useEffect } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/images/logo.svg"; // ✅ imported from src
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  // ✅ handle search
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterProducts);
  };

  // ✅ scroll event fixed (no memory leak)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ safer logs
  useEffect(() => {
    if (!loading) {
      console.log("User state:", user ?? "No user");
      console.log("isAuthenticated:", isAuthenticated);
    }
  }, [user, isAuthenticated, loading]);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="h-[50px] my-[20px] flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* Searchbox */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product....."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => {
                  const d = i.name;
                  const Product_name = d.replace(/\s* /g, "-"); // text amber-naz space khatam
                  return (
                    <Link key={index} to={`/product/${Product_name}`}>
                      <div className="w-full flex items-start py-3">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>

        {/* Navbar */}
        <div
          className={`${
            active ? "shadow-sm fixed top-0 left-0 z-10" : ""
          } transition hidden 8000px:flex items-center justify-between w-full bg-[#3321c8] h-[70px] `}
        >
          <div
            className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
          >
            {/* Categories */}
            <div onClick={() => setDropDown(!dropDown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block ">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
                {dropDown && (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                )}
              </div>
            </div>

            {/* Nav Items */}
            <div className={`${styles.noramlFlex}`}>
              <Navbar active={activeHeading} />
            </div>

            {/* Icons */}
            <div className="flex">
              {/* Heart */}
              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    0
                  </span>
                </div>
              </div>

              {/* Cart */}
              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    1
                  </span>
                </div>
              </div>

              {/* Profile */}
              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  {loading ? (
                    <p className="text-white">Loading...</p>
                  ) : isAuthenticated && user ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user?.profile_pic}`}
                        className="w-[40px] h-[40px] rounded-full"
                        alt="User Profile"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile
                        size={30}
                        color="rgb(255 255 255 / 83%)"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
