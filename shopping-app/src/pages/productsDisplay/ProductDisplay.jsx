import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Star } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import style from "./ProductDisplay.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Cataxios from "./../../apis/Cataxios";
import {} from "react-icons";
import { AiFillStar } from "react-icons/ai";
// import Statements
import axios from "./../../apis/Cataxios";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { OpenLogin } from "../../features/Login/LoginSlice";
import StarRatings from "../../components/starRating/StarRatings";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
import { Box, Grid } from "@mui/material";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


const ProductDisplay = () => {
  let currentUser = useSelector(state => state.user.currentUser);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [productName, setProductName] = useState("Kids");
  const [productPriceInfo, setProductPriceInfo] = useState(
    "From ₹8227.00/mo.Per Month with EMI,Footnote** or ₹69900.00"
  );
  const [offerDetails, setOfferDetails] = useState(
    "Get ₹9000.00 – ₹46700.00 off*"
  );
  const [ratings, setRating] = useState(4.9);
  const [price, setPrice] = useState(88);
  const [brand, setBrand] = useState("Apple");
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState(0);
  let handleBuy = e => {
    if (!currentUser.email) {
      dispatch(OpenLogin());
      return;
    }
    navigate("/checkout");
  };
  const fetchProd = async () => {
    try {
      let { data } = await Cataxios.get(`/allProduct/${id}`);
      console.log("fetching....");
      setProduct(data);
      setPrice(data.price);
      setDescription(data.description);
      setBrand(data.brand);
      setRating(data.rating);
      setProductName(data.title);
      setOffer(data.offer);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProd();
  }, [id]);
  return (
    <div>
      {/* title card */}
      <Card elevation={3} className={style.headingCard}>
        <section className={style.sectionCard}>
          <span className={style.heading}>
            <h1>{productName}</h1>
          </span>
          <span className={style.priceInfo}>
            <span>{productPriceInfo}</span>
          </span>
        </section>
      </Card>
      {/*price and additional info card*/}
      <div className={style.productInfoImgContainer}>
        {/* image card */}
        <div className={style.imageCard}>
          <section className={style.imgContainer}>
            <Carousel
              showThumbs={false}
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              showArrows={false}
              useKeyboardArrows={true}
            >
              {product.productImageURLs &&
                product.productImageURLs.map(e => {
                  return (
                    <div>
                      <img src={e} alt="watch" />
                    </div>
                  );
                })}

            
            </Carousel>
          </section>
          <footer className={style.imgCardFooterCard}>
            {price > 600 && <span>free Delivery</span>}
          </footer>
        </div>

        {/* --------------------------------------------------------------------------------------------------- */}

        {/* info card */}
        <div className={style.infoCard}>
          <h1 className={style.h1Title}>
            {productName}
            <sup className={style.supScript}>new</sup>
          </h1>
          <section className={style.offerDetailsContainer}>
            <span className={style.offerDetails}>
              {/* if possible add the "offer" details in json, it might help, for temporary purpose I'm using hard coding data */}
              {offerDetails}
            </span>
          </section>

          <span>
            Ratings:
            <span className={style.ratingstag}>
              {ratings.toFixed(1)}
              <StarRatings rating={ratings} left="1.7" top="0" />
              {/* <Chip className={style.chip} label="Best" /> */}
            </span>
          </span>
          <br />
          <br />
          <span>
            Price:
            {/* <span className={style.priceTag}>₹{price}</span>
            <sup className={style.supScriptPriceTag}>new</sup> */}
            <CalculateOffer originPrice={price} offerPercentage={offer} />
          </span>
          <section className={style.btnContainer}>
            <button className={style.buyNow} onClick={handleBuy}>
              Buy Now
            </button>
            <br />
            <button
              className={style.addToCart}
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Add To Cart
            </button>
          </section>
          <Accordion className={style.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                Product description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{description}</Typography>
            </AccordionDetails>
          </Accordion>
          <Box>
            Reviews
            <Grid></Grid>
          </Box>
        </div>
      </div>
      <div className={style.detailDescription}>
        <summary>
          <h3>Detailed Description</h3>
          <h4>{description}</h4>
        </summary>
      </div>
    </div>
  );
};

export default ProductDisplay;
