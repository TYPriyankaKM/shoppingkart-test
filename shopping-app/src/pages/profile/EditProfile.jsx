import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Axios from "../../apis/Axios";
import "./profile.css";
import { createCurrentUser } from "../../features/User/userSlice";

let initialState = {
  firstName: "",
  lastName: "",
  gender: null,
  phone: 0,
  email: "",
};

function EditProfile({ open, onClose }) {
  let currentUser = useSelector(state => state.user.currentUser);
  let token = useSelector(state => state.user.token);
  let { firstName, lastName, gender, email, phone, id } = currentUser;

  let [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      ...userData,
      firstName,
      lastName,
      gender,
      email,
      phone,
      // token,
    });
  }, []);

  const handleChange = e => {
    let value = e.target.value;
    setUserData(pre => ({ ...pre, [e.target.name]: value }));
  };
  console.log(token);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Axios.put(
        `http://localhost:5000/user/updateProfile/${id}`,
        userData
      );
      setTimeout(async () => {
        let detailsRes = await Axios.get("/api/user/detail", {
          headers: {
            "Context-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(detailsRes);

        dispatch(
          createCurrentUser({
            refreshToken: token,
            currentUser: detailsRes.data.userDetails,
          })
        );
      }, 200);
      onClose()
      toast.success("successfully updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="editpromodal">
      <Dialog open={open} onClose={onClose}>
        <Box
          className="editprofilebox"
          component="form"
          onSubmit={handleSubmit}
        >
          <h2>Edit Profile</h2>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                onChange={handleChange}
                value={userData.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={userData.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid
              item
              xs={12}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <Typography
                sx={{
                  marginRight: "1rem",
                  color: "navy",
                  display: "inline",
                  fontWeight: "semibold",
                }}
              >
                Gender:
              </Typography>
              <RadioGroup onChange={handleChange} value={userData.gender}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  name="gender"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  name="gender"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  name="gender"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="Phone Number"
                id="Phone Number"
                autoComplete="Phone Number"
                onChange={handleChange}
                value={userData.phone}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
    </section>
  );
}

export default EditProfile;
