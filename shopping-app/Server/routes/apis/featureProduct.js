const express = require("express");
const {
  getKidsProducts,
  getMensProducts,
  getWomensProducts,
  getBeatyProducts,
  findProduct,
  getElectronics,
} = require("../../Controller/ProductController");
const { getAllProducts } = require("../../Controller/ProductController");
const router = express.Router();

router.route("/allProduct").get(getAllProducts);
router.route("/allProduct/:id").get(findProduct);
router.route("/electronics").get(getElectronics);

router.route("/kids").get(getKidsProducts);
router.route("/men").get(getMensProducts);
router.route("/women").get(getWomensProducts);
router.route("/beautyProducts").get(getBeatyProducts);

module.exports = router;
