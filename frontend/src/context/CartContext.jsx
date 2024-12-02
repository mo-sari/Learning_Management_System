import { useState, useContext, createContext } from "react";
import apiInstance from "../utils/axios";
import CartId from "../views/plugin/CartId";
import useAxios from "../utils/useAxios";
import Toast from "../views/plugin/Toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [stats, setStats] = useState({});
  const [addToCartBtn, setAddToCartBtn] = useState("Add To Cart");

  const axiosInstance = useAxios();

  const fetchCartList = async () => {
    try {
      const response = await apiInstance.get(
        `/api/course/cart-list/${CartId()}/`
      );
      setCartList(response.data);
      setCartCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartStats = async () => {
    try {
      const response = await apiInstance.get(`/api/cart/stats/${CartId()}/`);
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const _add = async (formData) => {
    setAddToCartBtn("Adding To Cart");
    try {
      await axiosInstance.post(`api/course/cart/`, formData);
      setAddToCartBtn("Added To Cart");
      Toast().fire({
        title: "Added To Cart",
        icon: "success",
      });
      fetchCartList();
      fetchCartStats();
    } catch (err) {
      console.log(err);
      setAddToCartBtn("Add To Cart");
    }
  };

  const addToCart = async (courseId, userId, price, country, cartId) => {
    const formdata = new FormData();

    formdata.append("course_id", courseId);
    formdata.append("user_id", userId);
    formdata.append("price", price);
    formdata.append("country_name", country);
    formdata.append("cart_id", cartId);

    _add(formdata);
  };

  const removeFromCart = async (itemId) => {
    try {
      await apiInstance.delete(
        `api/course/cart-item-delete/${CartId()}/${itemId}/`
      );
      fetchCartList();
      fetchCartStats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartList,
        stats,
        fetchCartList,
        fetchCartStats,
        addToCartBtn,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
