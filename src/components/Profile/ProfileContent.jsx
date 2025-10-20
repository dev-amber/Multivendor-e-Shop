import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipcode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  {
    /*to submit form */
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
   <div className="w-full">
  {/* profile */}
  {active === 1 && (
    <div className="flex flex-col w-full">
      {/* Profile Image Upload */}
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={user?.avatar?.url}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input type="file" id="image" className="hidden" />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>

      <br />
      <br />

      {/* Form */}
      <div className="w-full px-5">
        <form>
          {/* Row 1: Full Name & Email */}
          <div className="w-full flex flex-col lg:flex-row pb-3">
            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 lg:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                className={`${styles.input} w-[95%] mb-1 lg:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Phone Number & Zip Code */}
          <div className="w-full flex flex-col lg:flex-row pb-3">
            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Phone Number</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 lg:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Zip Code</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 lg:mb-0`}
                required
                value={zipcode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Address 1 & Address 2 */}
          <div className="w-full flex flex-col lg:flex-row pb-3">
            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Address 1</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 lg:mb-0`}
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block pb-2">Address 2</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 lg:mb-0`}
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <input
            className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white transition"
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* refund  */}
      {active === 3 && (
        <div>
          <AllRefundsOrders />
        </div>
      )}

      {/* track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/*  payment methods */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/*   user address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      id: "68dd038624d5725574169557",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = orders.map((item) => ({
    id: item.id, // ✅ use correct field
    itemsQty: item.orderItems?.length || 0,
    total: "US$" + (item.totalPrice || 0),
    status: item.orderStatus || "Pending", // ✅ use correct field
  }));

  return (
    <div className="pl-0 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={[10]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundsOrders = () => {
  const orders = [
    {
      id: "68dd038624d5725574169557",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = orders.map((item) => ({
    id: item.id, // ✅ use correct field
    itemsQty: item.orderItems?.length || 0,
    total: "US$" + (item.totalPrice || 0),
    status: item.orderStatus || "Pending", // ✅ use correct field
  }));

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={[10]}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      id: "68dd038624d5725574169557",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = orders.map((item) => ({
    id: item.id, // ✅ use correct field
    itemsQty: item.orderItems?.length || 0,
    total: "US$" + (item.totalPrice || 0),
    status: item.orderStatus || "Pending", // ✅ use correct field
  }));

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSizeOptions={[10]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add new</span> {/* save any carduser */}
        </div>
      </div>
      <br />
      {/* card information */}
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP._j1m3nA4LvrSYnNhAmMYvQHaHa?pid=Api&P=0&h=220"
            className="w-[50px] "
          />
          <h5 className="pl-5 font-[600]">Amber </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">09/2025</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />{" "}
          {/* add any card user */}
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          {" "}
          My Addresses
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add new</span> {/* save any carduser */}
        </div>
      </div>
      <br />
      {/* card information */}
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>494 main street, lahore</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(213) 840-9876</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />{" "}
          {/* add any card user */}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
