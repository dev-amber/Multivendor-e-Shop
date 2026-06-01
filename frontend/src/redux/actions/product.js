import axios from "axios";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images,
  ) =>
  async (dispatch) => {
    // dispatch means run
    try {
      dispatch({
        type: "productCreateRequest",
      });
      // its only send requestto backend not for redux
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/create-product`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
        },
        {
          withCredentials: true,
        }
      );
      // dispatch write we awnt result to reducer used
      dispatch({
        type: "productCreateSuccess",
        payload: data.product, // product is coming from backend object
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get all products
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-products-shop/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getallproductFail",
      payload: error.response.data.message,
    });
  }
};

// delete product of shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error?.response?.data?.message,
    });
  }
};
