const express = require("express");
const handleLogOut = require("../../Controller/logoutController");
const RefreshToken = require("../../Controller/refreshTokenController");
const {
  RegisterUser,
  SignInUser,
  getAllUsers,
  forgotPassword,
} = require("../../Controller/UserController");
const { addNewAddress, updateProfile , updateAddress, deleteAddress} = require("../../Controller/userDataController");
const verifyAccessToken = require("../../middleware/verifyAccessToken");
const router = express.Router();

router.route("/signIn").post(SignInUser);

router.route("/users").post(RegisterUser);
router.route("/all").get(verifyAccessToken, getAllUsers);

router.get("/refresh", RefreshToken);
router.get("/logout", handleLogOut);

router.route("/forgot-password").post(forgotPassword);
router.route("/AddAddress/:id").put(addNewAddress);
router.route("/updateAddress/:id/:addressId").put(updateAddress);
router.route("/deleteAddress/:id/:addressId").delete(deleteAddress)
router.route("/updateProfile/:id").put(updateProfile);

// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key: "37472fa2437adf20044e822d39f26998-4f207195-8769c2c4",
// });

module.exports = router;
