const express = require("express");
const { getUser } = require("../../Controller/UserDetailsController");
const verifyAccessToken = require("../../middleware/verifyAccessToken");
const router = express.Router();

router.route("/detail").get(verifyAccessToken,getUser);




module.exports = router;