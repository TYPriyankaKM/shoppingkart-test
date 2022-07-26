import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
import { getCurrentProduct } from "../../features/products/productSlice";
// import Statements
import { addToCart,getCart } from "../../features/cart/cartSlice";
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
  let userId = currentUser.userId;
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  let [currentProduct, setCurrentProduct] = useState([]);
  // let currentProduct = useSelector(state => state.product.currentProduct);
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
  let [cartIdList, setCartIdList] = useState([]);
  let cartlist = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    // setIdList(cartList.map(item => item.productId));
    setCartIdList(cartlist.map(item => item.productId))
  }, [cartlist]);

  let handleBuy = e => {
    if (!currentUser.email) {
      dispatch(OpenLogin());
      return;
    }
    navigate("/selectaddress");
  };
  // const fetchProd = async () => {
  //   try {
  //     let { data } = await Cataxios.get(`/allProduct/${id}`);
  //     console.log("fetching....");
  //     setProduct(data);
  //     setPrice(data.price);
  //     setDescription(data.description);
  //     setBrand(data.brand);
  //     setRating(data.rating);
  //     setProductName(data.title);
  //     setOffer(data.offer);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  let payload = {
    cost: currentProduct.price,
    imageLink: currentProduct.thumbnailURL,
    quantity: 1,
    productId: currentProduct.productId,
  };
  let cartData = {
    userId,
    payload,
  };
  useEffect(() => {
    // fetchProd();
    fetch(
      `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/products/${id}`
    )
      .then(res => res.json())
      .then(data => setCurrentProduct(data.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      {/* title card */}
      <Card elevation={3} className={style.headingCard}>
        <section className={style.sectionCard}>
          <span className={style.heading}>
            <h1>{currentProduct.title}</h1>
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
              {currentProduct.productImageURLs &&
                currentProduct.productImageURLs.map(e => {
                  return (
                    <div>
                      <img src={e} alt={currentProduct.title} />
                    </div>
                  );
                })}
            </Carousel>
          </section>
          <footer className={style.imgCardFooterCard}>
            {currentProduct.price > 1000 && <span>free Delivery</span>}
          </footer>
        </div>

        {/* --------------------------------------------------------------------------------------------------- */}

        {/* info card */}
        <div className={style.infoCard}>
          <h1 className={style.h1Title}>
            {currentProduct.brand}
            <sup className={style.supScript}>new</sup>
          </h1>
          <section className={style.offerDetailsContainer}>
            <span className={style.offerDetails}>
              {/* if possible add the "offer" details in json, it might help, for temporary purpose I'm using hard coding data */}
              {/* {currentProduct.offer}% OFF */}
            </span>
          </section>

          <span>
            Ratings:
            <span className={style.ratingstag}>
              {currentProduct.rating}
              <StarRatings rating={currentProduct.rating} left="1.7" top="0" />
              {/* <Chip className={style.chip} label="Best" /> */}
            </span>
          </span>
          <br />
          <br />
          <span>
            Price:
            {/* <span className={style.priceTag}>₹{price}</span>
            <sup className={style.supScriptPriceTag}>new</sup> */}
            <CalculateOffer
              originPrice={currentProduct.price}
              offerPercentage={offer}
            />
          </span>
          <section className={style.btnContainer}>
            <button className={style.buyNow} onClick={handleBuy}>
              Buy Now
            </button>
            <br />

            <button
              className={style.addToCart}
              onClick={() => {
               if( cartIdList.includes(currentProduct.productId)==false)
                dispatch(addToCart({userId,payload:{cost: currentProduct.price,
                  imageLink: currentProduct.thumbnailURL,
                  quantity: 1,
                  productId: currentProduct.productId,}}))
                setTimeout(() => {
                  dispatch(getCart(userId));
                }, 300)
              }}
            >
              {cartIdList.includes(currentProduct.productId)?"added":"add to cart"}

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
              <Typography>{currentProduct.description}</Typography>
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
