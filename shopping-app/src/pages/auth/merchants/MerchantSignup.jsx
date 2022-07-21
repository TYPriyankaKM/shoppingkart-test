import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, TextField, makeStyles, Checkbox } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import style from "./merchantSignup.module.css";
import { motion } from "framer-motion";
import Axios from "../../../apis/Axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "animate.css";
import clsx from "clsx";
import TermsConditions from "../TermsConditions";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { OpenLogin } from "../../../features/Login/LoginSlice";
import { Country, State, City } from "country-state-city";

// import { motion, Variants } from "framer-motion";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 50,
  },
  formTextFieldName: {
    width: 200,
    // paddingLeft: 15,
    spacing: 5,
    marginTop: 3,
  },
  formTextFieldOther: {
    spacing: 5,
    marginTop: 3,
    width: 420,
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  passwordField: {
    width: 420,
    height: 40,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MerchantSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("nopassword");
  // const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [payload, setPayload] = useState({});
  const [btnCondition, setBtnCondition] = useState(false);
  const [model, setModel] = useState(false);
  const [number1, setNumber1] = useState();

  const [commission, setCommission] = useState("");
  const [productLimit, setProductLimit] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstn, setGstn] = useState("");

  // company address
  const [companyNUmber, setCompanyNUmber] = useState("");
  const [companyStreet, setCompanyStreet] = useState("");
  const [companyLine1, setCompanyLine1] = useState("");
  const [companyLine2, setCompanyLine2] = useState("");
  const [companyLandmark, setCompanyLandmark] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companyPincode, setCompanyPincode] = useState("");
  const [companyRegisterNumber, setCompanyRegisterNumber] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebAddress, setCompanyWebAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  // const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault();
    window.alert(" Successfully Registered Please Check your mail and Verify");
    let currPayload = {
      firstName: fname,
      lastName: lname,
      email,
      phone: number1,
      password,
      role: ["MERCHANT"],
      gender,
      commission,
      productLimit,
      company: {
        name: companyName,
        gstn,
        address: {
          number: companyNUmber,
          street: companyStreet,
          line1: companyLine1,
          line2: companyLine2,
          landmark: companyLandmark,
          city: companyCity,
          state: companyState,
          country: companyCountry,
          pincode: companyPincode,
        },
        registerNumber: companyRegisterNumber,
        phone: companyPhone,
        webAddress: companyWebAddress,
        email: companyEmail,
      },
    };
    setPayload(currPayload);
    console.log(payload);
    fetchData(currPayload);
    navigate("/");
  };

  const fetchData = async currPayload => {
    try {
      await Axios.post("/user/signUp", currPayload);
      toast.success("successfully registered");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <br />
      <motion.div className={clsx(style.formCard)}>
        <h1>Create Your Profile</h1>
        <section>
          One profile ID is all you need to access all KART services. You
          already have a profile?{" "}
          <a
            onClick={() => {
              dispatch(OpenLogin());
              navigate("/");
            }}
          >
            Find it here{" "}
          </a>
        </section>
        <form onSubmit={handleSubmit}>
          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="First Name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={fname}
              onChange={e => {
                setFname(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Last Name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={lname}
              onChange={e => {
                setLname(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <section
                style={{
                  display: "flex",
                  // alignItems: "baseline",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <FormControlLabel
                  className={style.radioGroup}
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  className={style.radioGroup}
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </section>
            </RadioGroup>
          </Card>
          {/* phone number1 mandatory */}
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Phone Number"
              required
              placeholder="9856412537"
              id="outlined-size-small"
              variant="outlined"
              value={number1}
              onChange={e => setNumber1(e.target.value)}
            ></TextField>
          </Card>
          {/* number2 optional */}

          {/* address 1 is mandatory */}

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Email Address"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="exmaple@company.com"
              required
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent", display: "none" }} // display none
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Password"
              id="outlined-size-small password"
              variant="outlined"
              required
              value={password}
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            {/* <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Role"
              id="outlined-size-small role"
              variant="outlined"
              required
              value={role}
              onChange={e => {
                setRole(e.target.value);
              }}
            ></TextField> */}
          </Card>

          {/* additional details add here */}

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Commission details"
              id="outlined-size-small"
              variant="outlined"
              required
              value={commission}
              onChange={e => {
                setCommission(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Product Limit"
              id="outlined-size-small"
              variant="outlined"
              required
              value={productLimit}
              onChange={e => {
                setProductLimit(e.target.value);
              }}
            ></TextField>
          </Card>

          {/* company details */}

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Company name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyName}
              onChange={e => {
                setCompanyName(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="GST number"
              id="outlined-size-small"
              variant="outlined"
              required
              value={gstn}
              onChange={e => {
                setGstn(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <h5>Company Address</h5>
          </Card>

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="building number"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyNUmber}
              onChange={e => {
                setCompanyNUmber(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="street name"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyStreet}
              onChange={e => {
                setCompanyStreet(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Line 1"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyLine1}
              onChange={e => {
                setCompanyLine1(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Line 2"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyLine2}
              onChange={e => {
                setCompanyLine2(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Landmark"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyLandmark}
              onChange={e => {
                setCompanyLandmark(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="City"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyCity}
              onChange={e => {
                setCompanyCity(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            style={{ backgroundColor: "transparent" }}
            elevation={0}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="State"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyState}
              onChange={e => {
                setCompanyState(e.target.value);
              }}
            ></TextField>
            <TextField
              className={classes.formTextFieldName}
              size="small"
              label="Country"
              id="outlined-size-small"
              variant="outlined"
              required
              value={companyCountry}
              onChange={e => {
                setCompanyCountry(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Pincode"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="654876"
              required
              value={companyPincode}
              onChange={e => {
                setCompanyPincode(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Company Register Number"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="1234567"
              required
              value={companyRegisterNumber}
              onChange={e => {
                setCompanyRegisterNumber(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Company Phone Number"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="080-232654876"
              required
              value={companyPhone}
              onChange={e => {
                setCompanyPhone(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="Company Website"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="www.paratlan.com"
              required
              value={companyWebAddress}
              onChange={e => {
                setCompanyWebAddress(e.target.value);
              }}
            ></TextField>
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              label="company Email"
              id="outlined-size-small email"
              variant="outlined"
              placeholder="mycompany@paratlan.com"
              required
              value={companyEmail}
              onChange={e => {
                setCompanyEmail(e.target.value);
              }}
            ></TextField>
          </Card>

          {/* i agree field starts*/}

          <Card
            className={clsx(style.formCardContainer, style.Checkbox)}
            elevation={0}
            style={{ backgroundColor: "transparent" }}
          >
            <span
              style={{ marginLeft: "300px", display: "flex", width: "350px" }}
            >
              <FormControlLabel
                // className={style.radioGroup}
                style={{ width: "35px" }}
                value="other"
                checked={btnCondition}
                onClick={() => {
                  setModel();
                  setModel(true);
                }}
                control={<Checkbox />}

                // label="I agree to the Terms Conditions*"
              />
              <span
                style={{
                  display: "inline-block",
                  width: "300px",
                  marginTop: "12px",
                }}
              >
                I agree to the{" "}
                <a
                  href="#"
                  onClick={() => {
                    setModel(true);
                  }}
                >
                  Terms Conditions
                </a>
                *
              </span>
            </span>
          </Card>
          <Card style={{ marginLeft: "300px" }}>
            {model && (
              <TermsConditions
                modelCondition={setModel}
                condition={setBtnCondition}
              />
            )}
          </Card>

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <button className={style.bn5}>Register</button>
          </Card>
        </form>
      </motion.div>
      <br />
    </>
  );
};

export default MerchantSignup;
