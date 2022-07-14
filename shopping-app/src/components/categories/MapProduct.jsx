import { Button, Card } from "@mui/material";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import style2 from "../featured products/featuredProducts.module.css";
import style from "./cat.module.css";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { useEffect } from "react";
import CalculateOffer from "../Offer Helper Components/CalculateOffer";
import StarRatings from "../starRating/StarRatings";
const MapProduct = ({ data, getSort, sortingType, objKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getSort(objKey);
  }, [sortingType]);
  return (
    <div className={style.box}>
      {data.map(data => {
        let { productsid, brand, rating, thumbnailURL, price, title, offer } =
          data;
        return (
          <Card
            data-aos="zoom-in"
            data-aos-offset="200"
            onClick={() => navigate(`/products_page/${productsid}`)}
            className={style2.productCard}
            style={{
              background: "#efefef",
              border: "#d2cdcd 0.1px solid",
            }}
            key={productsid}
          >
            <div className={style2.cardBody}>
              <img src={thumbnailURL} alt={title} />
            </div>
            <div className={style2.cardHeader}>
              <span>{rating.toFixed(1)}</span>
              <StarRatings rating={rating} left="2.5" />
              {rating > 4.6 ? <span>Featured</span> : null}
            </div>
            <div className={style2.cardFooter}>
              <div className={style2.footerLeft}>
                <span>{brand}</span>
                <span>
                  {title.length > 38 ? title.slice(0, 35) + "..." : title}
                </span>
                <CalculateOffer originPrice={price} offerPercentage={offer} />
              </div>
              <div className={style2.footerRight}>
                <Button
                  size="small"
                  varient="outlined"
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(addToCart(data));
                  }}
                >
                  Add to cart
                </Button>
                <AiOutlineHeart
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(addToWishlist(data));
                  }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MapProduct;
