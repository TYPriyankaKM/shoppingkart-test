import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import Spinner from "./../spinner/Spinner";
import styles from "./featuredProducts.module.css";
import {
  addToCart,
  getCart,
  deleteFromCart,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../pagination/PaginationComp";
import { AiOutlineHeart } from "react-icons/ai";
import {
  addToWishlist,
  deleteFromWishlist,
  getAllWishlist,
} from "../../features/wishlist/wishlistSlice";
import Card from "@material-ui/core/Card";
import { Button } from "@mui/material";
import CalculateOffer from "../Offer Helper Components/CalculateOffer";
import StarRatings from "../starRating/StarRatings";
import { sx } from "@mui/joy/styles/styleFunctionSx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Axios from "../../apis/Axios";

const FeaturedProducts = () => {
  let product = useSelector(state => state.product);
  let cartList = useSelector(state => state.wishlist.wishList);
  let cartlist = useSelector(state => state.cart.cartItems);

  let [productIdList, setIdList] = useState([]);
  let [cartIdList, setCartIdList] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [prodList, setProdList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let cardPerPage = 12;
  let totalPages = Math.ceil(product.productList.length / cardPerPage);
  const userId = useSelector(state => state.user.currentUser.userId);

  const setPage = () => {
    let start, end;
    if (currentPage === 1) {
      start = 0;
      end = currentPage * cardPerPage;
    } else {
      start = currentPage * cardPerPage - cardPerPage;
      end = currentPage * cardPerPage;
    }
    setProdList(product.productList.slice(start, end));
  };
  useEffect(() => {
    setPage();
  }, [currentPage, product]);

  useEffect(() => {
    dispatch(getAllWishlist({ userId }));
  }, []);
  useEffect(() => {
    dispatch(fetchProducts());
    fetch("http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/products")
      .then(res => res.json())
      .then(data => setProdList(data.data))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    setIdList(cartList.map(item => item.productId));
    setCartIdList(cartlist.map(item => item.productId))
  }, [cartList,cartlist]);

  // let handleAddToCart = async (cost, imageLink, productId) => {
  //   try {
  //     let cartProduct = {
  //       cost: cost,
  //       imageLink: imageLink,
  //       quantity: 1,
  //       productId: productId,
  //     };
  //     await Axios.post(`/customers/${userId}/carts`, cartProduct);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <section className={styles.featuredProducts}>
      <article>
        <h1>Featured Products</h1>
        <div className={styles.cardContainer}>
          {prodList.length === 0 ? (
            <Spinner />
          ) : (
            prodList.map((product, index) => {
              let {
                productId,
                title,
                price,
                thumbnailURL,
                offer,
                rating,
                brand,
              } = product;
              let payload = {
                cost: price,
                imageLink: thumbnailURL,
                quantity: 1,
                productId: productId,
              };
              let data = {
                userId,
                payload,
              };
              let cartData = {
                userId,
                payload,
              };
              return (
                <Card
                  data-aos="zoom-in"
                  data-aos-offset="200"
                  onClick={() => navigate(`/products_page/${productId}`)}
                  className={styles.productCard}
                  key={productId}
                >
                  <div className={styles.cardBody}>
                    <img src={thumbnailURL} alt={title} />
                  </div>
                  <div className={styles.cardHeader}>
                    <span>{rating.toFixed(1)}</span>
                    <StarRatings rating={rating} left="2.5" />
                    {/* <span style={{color:"black"}}>{rating}</span> */}
                    {rating > 4.6 ? <span>Featured</span> : null}
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.footerLeft}>
                      <span>{brand.toUpperCase()}</span>
                      <span>
                        {title.length > 38 ? title.slice(0, 38) + "..." : title}
                      </span>
                      <span>
                        <CalculateOffer
                          originPrice={price}
                          offerPercentage={offer}
                        />
                      </span>
                    </div>
                    <div className={styles.footerRight}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          // handleAddToCart(price, thumbnailURL, productId);
                          if (cartIdList.includes(productId)==false) {
                            dispatch(addToCart(cartData));
                            setTimeout(() => {
                              dispatch(getCart(userId));
                            }, 300)
                          }
                        }}
                      >
                        {cartIdList.includes(productId)
                          ? "added"
                          : "add to cart"}
                      </Button>
                      <FavoriteIcon
                        onClick={e => {
                          e.stopPropagation();
                          if (productIdList.includes(productId)) {
                            dispatch(
                              deleteFromWishlist({
                                userId,
                                wishlistId: productId,
                              })
                            );
                            return;
                          }
                          dispatch(addToWishlist(data));
                        }}
                        style={{
                          fill: productIdList.includes(productId)
                            ? "red"
                            : "#c0bfbf",
                        }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
        <PaginationComp
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </article>
    </section>
  );
};

export default FeaturedProducts;
