import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const AllProducts = () => {
  const dispatch = useDispatch();

  // ✅ SAFE STATE (prevents undefined crash)
  const { products = [], isLoading = false } = useSelector(
    (state) => state.products || {}
  );

  const { seller } = useSelector((state) => state.seller || {});

  // ✅ Fetch products when seller is available
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  // ✅ Delete without reload
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // ================= COLUMNS =================
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6 },

    {
      field: "preview",
      headerName: "Preview",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  // ================= ROWS (SAFE) =================
  const rows = (products || []).map((item) => ({
    id: item._id,
    name: item.name,
    price: "US$" + item.discountPrice,
    stock: item.stock,
    sold: item.sold_out,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-10 bg-white pt-1 mx-0">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
            disableRowSelectionOnClick
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;