import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, TextField, makeStyles, Checkbox } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import style from "./signup.module.css";
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
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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

const Signup = () => {
  let currUser = useSelector(state => state.user.currentUser);

  let { addressList, userId } = currUser;
  console.log(currUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  //   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("nopassword");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("male");
  const [payload, setPayload] = useState({});
  const [btnCondition, setBtnCondition] = useState(false);
  const [model, setModel] = useState(false);
  const [number, setNumber] = useState();
  const [address, setAddress] = useState({
    city: "",
    country: "",
    line1: "",
    street: "",
    landMark: "",
    state: "",
    pincode: "",
  }
  );
  const [allCountries, setAllCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [allStates, setAllStates] = useState([]);
  const [allCity, setAllcity] = useState([]);

  useEffect(() => {
    let allCountriesData = Country.getAllCountries().map(countryData => {
      return countryData.name;
    });
    setAllCountries(allCountriesData);
  }, []);

  function enableStateDropDown(countryCode1) {
    let allStatesData = State.getStatesOfCountry(`${countryCode1}`);
    setAllStates(allStatesData);
  }

  function enableCityDropDown(stateCode1) {
    let allCityData = City.getCitiesOfState(countryCode, stateCode1);
    setAllcity(allCityData);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let currPayload = {
      ...address,
    };
    try {
      await Axios.post(`/customers/${userId}/address`, currPayload);
      toast.success("successfully added");
      navigate("/my-profile/my-addresses")
      // window.location.assign("/my-profile/my-addresses")
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <br />
      <motion.div className={clsx(style.formCard)}>
        <h1>Add Address</h1>
        <section>
          One profile ID is all you need to access all KART services. You
          already have a profile?{" "}
          <a
            onClick={() => {
              dispatch(OpenLogin());
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
          ></Card>

          {/* <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          ></Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          ></Card> */}
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
              id="outlined-size-small"
              label="House/Office-Number"
              placeholder="eg-142/87"
              variant="outlined"
              value={address.line1}
              required
              onChange={e => {
                setAddress({ ...address, line1: e.target.value });
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
              id="outlined-size-small"
              label="Street"
              placeholder="eg-4th Street"
              variant="outlined"
              value={address.street}
              required
              onChange={e => {
                setAddress({ ...address, street: e.target.value });
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
              id="outlined-size-small"
              variant="outlined"
              value={address.landMark}
              label="landMark"
              required
              placeholder="eg-near This and That"
              onChange={e => {
                setAddress({ ...address, landMark: e.target.value });
              }}
            ></TextField>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            {/* country */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Country
              </InputLabel>
              {/* select country code */}
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.country}
                required
                onChange={e => {
                  setAddress({ ...address, country: e.target.value });
                  // set country code
                  let countryCode1 = "";
                  Country.getAllCountries().map(countryData => {
                    if (countryData.name == e.target.value) {
                      setCountryCode(countryData.isoCode);
                      countryCode1 = countryData.isoCode;
                    }
                  });

                  enableStateDropDown(countryCode1);
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allCountries.map((countryName, i) => {
                  return (
                    <MenuItem value={`${countryName}`} key={`${i}`}>
                      {`${countryName}`}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your Country</FormHelperText>
            </FormControl>

            {/* state */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.state}
                required
                onChange={e => {
                  setAddress({ ...address, state: e.target.value });
                  // set state code
                  let stateCode1 = "";
                  State.getStatesOfCountry(`${countryCode}`).map(stateData => {
                    if (stateData.name == e.target.value) {
                      stateCode1 = stateData.isoCode;
                    }
                  });

                  enableCityDropDown(stateCode1);
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allStates.map((stateName, j) => {
                  return (
                    <MenuItem
                      value={`${stateName.name}`}
                      key={`${j}`}
                    >{`${stateName.name}`}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your State</FormHelperText>
            </FormControl>
            {/* cities */}
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                city
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={address.city}
                required
                onChange={e => {
                  setAddress({ ...address, city: e.target.value });
                }}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=""></MenuItem>
                {allCity.map((cityName, k) => {
                  return (
                    <MenuItem
                      value={`${cityName.name}`}
                      key={`${k}`}
                    >{`${cityName.name}`}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select your city</FormHelperText>
            </FormControl>
          </Card>
          <Card
            elevation={0}
            style={{ backgroundColor: "transparent" }}
            className={style.formCardContainer}
          >
            <TextField
              className={classes.formTextFieldOther}
              size="small"
              variant="outlined"
              placeholder="eg-895641"
              label="Pincode"
              required
              value={address.pincode}
              onChange={e => {
                setAddress({ ...address, pincode: e.target.value });
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
              id="outlined-size-small"
              label="Number"
              placeholder="Number"
              variant="outlined"
              value={address.number}
              required
              onChange={e => {
                setNumber({ ...address, number: e.target.value });
              }}
            ></TextField>
          </Card>
{/* 

          <Card
            elevation={0}
            style={{ backgroundColor: "transparent", display: "none" }}
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
          </Card> */}

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
            <button className={style.bn5}>Add Address</button>
          </Card>
        </form>
      </motion.div>
      <br />
    </>
  );
};

export default Signup;
