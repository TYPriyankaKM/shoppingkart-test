import { useEffect } from "react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import Axios from "../../apis/Axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import { CloseLogin, OpenLogin } from "../../features/Login/LoginSlice";
import { createCurrentUser } from "../../features/User/userSlice";
import UserMenu from "../UserMenu/UserMenu";
import CartDropdown from "../CartDropDown/CartDropdown";
import { BiAlignRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { getCart, getCartCount } from "../../features/cart/cartSlice";
// import axios from './../../apis/Axios';

const Auth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  let cartValue = useSelector(state => state.cart.cartItems);
  let cart = useSelector(state => state.cart);

  // console.log(cartValue);
  const isLoginOpen = useSelector(state => state.Login.isOpen);
  const currentUser = useSelector(state => state.user.currentUser);
  const [count, setCount] = useState([]);
  const [opendrop, setOpendrop] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [openCart, setCart] = useState(false);
  const handleChange = (e, prop) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleClickShowPassword = e => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  let cartCount = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCart(currentUser.userId));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let { data } = await Axios.post(
        "/users/login",
        {
          email: values.email,
          password: values.password,
        }
        // { withCredentials: true }
      );
      console.log(data);
      if (data.message == "OK") {
        dispatch(
          createCurrentUser({
            currentUser: data.data,
            token: data.data.token,
          })
        );
        dispatch(CloseLogin());
        toast.success("successfully logged in");
        navigate("/Home");
        dispatch(getCart(data.data.userId));
      } else toast.error("Invalid password or Email");
    } catch (err) {
      toast.info(err);
    }

    setValues({ email: "", password: "", showPassword: false });
  };
  return (
    <div className={currentUser.email ? styles.authBlock2 : styles.authBlock}>
      {currentUser.email && (
        <a
          onClick={e => navigate("/cart")}
          className={styles.cartIcon}
          onMouseEnter={() => setCart(true)}
          onMouseLeave={() => setCart(false)}
          style={{ marginRight: "0.6rem" }}
        >
          <AiOutlineShoppingCart />
          {/* {openCart && <CartDropdown />} */}
          <span>{cartCount?.length || 0}</span>
        </a>
      )}

      {currentUser.email || location.pathname === "/signup" ? (
        currentUser.email && <UserMenu user={currentUser} />
      ) : (
        <button
          onClick={() => dispatch(OpenLogin())}
          className={styles.Loginbutton}
        >
          Login
        </button>
      )}

      {/* {!currentUser.email && (
        <Link to="/signup">
          <button className={styles.Signupbutton}>Signup</button>
        </Link>
      )} */}

      <Dialog
        open={isLoginOpen}
        onClose={() => dispatch(CloseLogin())}
        component="form"
        // maxWidth="md"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            color: "#3f51b5",
          }}
        >
          <h1>Login</h1>
          {/* <span>or</span>
          <a
            onClick={() => {
              navigate("/signup");
              dispatch(CloseLogin());
            }}
            style={{ textDecoration: "underLine", cursor: "pointer" }}
          >
            create a account
          </a> */}
        </div>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "22rem",
              margin: "0.2rem 0rem",
            }}
          >
            <FormControl
              sx={{ m: 1, width: "30rem", margin: "1rem" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Email or phone
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={values.email}
                style={{ marginBottom: "2rem" }}
                onChange={e => handleChange(e, "email")}
                label="Email or phone"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "30rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={e => handleChange(e, "password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ width: "90%", margin: "0.7rem auto" }}
            >
              submit
            </Button>
          </Box>
        </DialogContent>
        <div
          style={{
            display: "flex",
            placeItems: "center",
            marginBottom: "1.5rem",
            justifyContent: "space-evenly",
          }}
        >
          <a
            onClick={() => {
              navigate("/signup");
              dispatch(CloseLogin());
            }}
            style={{ cursor: "pointer", color: "blue" }}
          >
            create a account
          </a>
          <a
            onClick={() => {
              navigate("/forgot");
              dispatch(CloseLogin());
            }}
            style={{ textDecoration: "underLine", cursor: "pointer" }}
          >
            Forgot Password?
          </a>
        </div>
      </Dialog>
    </div>
  );
};

export default Auth;
