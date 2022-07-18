import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import { addToCart, deleteFromCart } from "../../features/cart/cartSlice";
import { Card } from "@material-ui/core";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import StarRatings from "../../components/starRating/StarRatings";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "../../apis/Axios";
import { getCart } from "../../features/cart/cartSlice";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
const CheckoutProducts = () => {
  // for the card
  const navigate = useNavigate();
  // const cart = useSelector(state => state.cart.cartItems);
  const allProducts = useSelector(state => state.product.productList);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [cartIdObject, setCartIdObject] = useState({});
  // const cartSet = cart.map(JSON.stringify);
  // const uniqueSet = new Set(cartSet);
  // let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  // // for quantity
  // const productQuantityCounter = {};
  // const cartQnty = useSelector(state => state.cart);
  // cartQnty.cartItems.map(element => {
  //   productQuantityCounter[element.productId] =
  //     (productQuantityCounter[element.productId] || 0) + 1;
  // });

  const { userId, cartList } = useSelector(state => state.user.currentUser);
  const cartItems = useSelector(state => state.cart.cartItems);
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

  useEffect(() => {
    let cartIdList = cartItems.map(item => item.productId);
    let newCartIdobj = cartItems.reduce((acc, item) => {
      return { ...acc, [item.productId]: item.itemId };
    }, {});
    setCartIdObject(newCartIdobj);
    let filteredList = allProducts.filter(item => {
      return cartIdList.includes(item.productId);
    });
    console.log(filteredList);
    setCart(filteredList);
  }, [cartItems]);
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
            productId,
            title,
            price,
            description,
            offer,
            thumbnailURL,
            rating,
            brand,
          } = product;
          let payload = {
            userId,
            productId,
          };
          return (
            <Card
              elevation={5}
              className={styles.cartProduct}
              key={productId}
              onClick={() => navigate(`/products_page/${productId}`)}
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
                <CalculateOffer originPrice={price} offerPercentage={offer} />
                <div className={styles.quantity}>
                  <AiOutlineMinusCircle
                    onClick={e => {
                      e.stopPropagation();
                      // dispatch(removeFromCart(index));
                    }}
                  />
                  {/* <span>Qty:{productQuantityCounter[productId]}</span> */}
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
                    dispatch(
                      deleteFromCart({
                        userId,
                        cartId: cartIdObject[productId],
                      })
                    );
                    setTimeout(() => {
                      dispatch(getCart(userId));
                    }, 200);
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
