import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import styles from "./wishlist.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
import StarRatings from "../../components/starRating/StarRatings";
import { Button } from "@mui/material";
import { addToCart } from "../../features/cart/cartSlice";
const Wishlist = () => {
  let navigate = useNavigate();
  let wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  return (
    <section className={styles.wishlist}>
      <article>
        <h1>My Wishlist ({wishlist.wishList.length})</h1>
        {wishlist.wishList.length === 0 ? (
          <h1>Your wish list is empty please go back and add some products</h1>
        ) : (
          <div className={styles.listContainer}>
            {wishlist.wishList.map((product, index) => {
              let {
                productsid,
                brand,
                title,
                description,
                price,
                rating,
                thumbnailURL,
                offer,
              } = product;
              return (
                <div
                  onClick={() => navigate(`/products_page/${productsid}`)}
                  className={styles.wishlistProduct}
                  key={productsid}
                >
                  <div className={styles.prodImg}>
                    <img
                      src={thumbnailURL}
                      alt={title}
                      height="200"
                      width="200"
                    />
                  </div>
                  <div className={styles.prodDetails}>
                    <h2>
                      {brand} {title}
                    </h2>
                    <p>{description}</p>
                    <span style={{ position: "relative", width: "100%" }}>
                      {rating.toFixed(1)}
                      <StarRatings rating={rating} left="1.7" top="0" />
                      {/* <Chip className={style.chip} label="Best" /> */}
                    </span>
                    <CalculateOffer
                      originPrice={price}
                      offerPercentage={offer}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        dispatch(addToCart(product));
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(removeFromWishlist(productsid));
                    }}
                    className={styles.deleteIcon}
                  >
                    <AiOutlineDelete />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
};

export default Wishlist;
