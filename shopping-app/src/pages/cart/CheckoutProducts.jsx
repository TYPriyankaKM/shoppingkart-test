import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import {
  addToCart,
  removeFromCart,
  removeWholeProduct,
} from "../../features/cart/cartSlice";
import { Card } from "@material-ui/core";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import StarRatings from "../../components/starRating/StarRatings";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "../../apis/Axios";
import { getCart } from "../../features/cart/cartSlice";
const CheckoutProducts = () => {
  // for the card
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  // const cartSet = cart.map(JSON.stringify);
  // const uniqueSet = new Set(cartSet);
  // let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  // // for quantity
  // const productQuantityCounter = {};
  // const cartQnty = useSelector(state => state.cart);
  // cartQnty.cartItems.map(element => {
  //   productQuantityCounter[element.productsid] =
  //     (productQuantityCounter[element.productsid] || 0) + 1;
  // });
  const userId = useSelector(state => state.user.currentUser.userId);
  const fetchProduct = async id => {
    try {
      let { data } = await Axios.get(`/products/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch(getCart(userId));
  }, []);
  return (
    <div className={styles.checkoutProductContainer}>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="..."
          />
          <h2>Your cart is empty!</h2>
          <p>It's a good day to buy the items you saved for later!</p>
        </div>
      ) : (
        cart.map((product, index) => {
          let {
            productsid,
            title,
            price,
            description,

            thumbnailURL,
            rating,
            brand,
          } = product;

          return (
            <Card
              elevation={5}
              className={styles.cartProduct}
              key={productsid}
              onClick={() => navigate(`/products_page/${productsid}`)}
            >
              <img src={thumbnailURL} alt={title} />
              <div className={styles.productDetails}>
                <h3>{brand}</h3>
                <p>{title}</p>
                <p>{description}</p>
              </div>
              <div className={styles.moreDetails}>
                {/* <StarRatings rating={rating} /> */}
                <span>{rating}⭐</span>

                <span>₹{price}</span>
                <div className={styles.quantity}>
                  <AiOutlineMinusCircle
                    onClick={e => {
                      e.stopPropagation();
                      // dispatch(removeFromCart(index));
                    }}
                  />
                  {/* <span>Qty:{productQuantityCounter[productsid]}</span> */}
                  <AiOutlinePlusCircle
                    onClick={e => {
                      e.stopPropagation();
                      // dispatch(addToCart(product));
                    }}
                  />
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    // dispatch(removeWholeProduct(productsid));
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default CheckoutProducts;
