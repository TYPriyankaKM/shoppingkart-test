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
import { useState } from "react";
import StarRatings from "../../components/starRating/StarRatings";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CheckoutProducts = () => {
  // for the card
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartSet = cart.cartItems.map(JSON.stringify);
  const uniqueSet = new Set(cartSet);
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  // for quantity
  const productQuantityCounter = {};
  const cartQnty = useSelector(state => state.cart);
  cartQnty.cartItems.map(element => {
    productQuantityCounter[element.productsid] =
      (productQuantityCounter[element.productsid] || 0) + 1;
  });
  return (
    <div
      className={styles.checkoutProductContainer}
      style={{ margin: "1rem auto" }}
    >
      <h1>My Order</h1>
      {cart.cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="..."
          />
          <h2>You Order List is Empty</h2>
          <p>It's a good day to buy the items you saved for later!</p>
        </div>
      ) : (
        uniqueArray.map((product, index) => {
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
              style={{ margin: "10px" }}
            >
              <img src={thumbnailURL} alt={title} />
              <div className={styles.productDetails}>
                <h3>{brand}</h3>
                <p>{title}</p>
                <p>{description}</p>
              </div>
              <div className={styles.moreDetails}>
                <span>{rating}⭐</span>

                <span>₹{price}</span>
                <div className={styles.quantity}>
                  <span>Qty:{productQuantityCounter[productsid]}</span>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default CheckoutProducts;
