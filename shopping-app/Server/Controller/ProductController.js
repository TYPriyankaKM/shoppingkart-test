const path = require("path");
const featureProductJson = require("../Model/featureProducts.json");
const kidsJson = require("../Model/kids.json");
const MenJson = require("../Model/men.json");
const WomenJson = require("../Model/women.json");
const BeatyproductJson = require("../Model/beautyProducts.json");
const ElectronicsJson = require("../Model/electronics.json");
const { realpathSync } = require("fs");

const getAllProducts = (req, res) => {
  res.json(featureProductJson);
};
const getKidsProducts = (req, res) => {
  res.json(kidsJson);
};
const getMensProducts = (req, res) => {
  res.json(MenJson);
};
const getWomensProducts = (req, res) => {
  res.json(WomenJson);
};
const getBeatyProducts = (req, res) => {
  res.json(BeatyproductJson);
};

const getElectronics = (req, res) => {
  res.json(ElectronicsJson);
};
const findProduct = (req, res) => {
  let id = req.params.id;
  let findedProduct = featureProductJson.find(item => item.productsid === id);
  res.json(findedProduct);
};

module.exports = {
  getAllProducts,
  getKidsProducts,
  getBeatyProducts,
  getMensProducts,
  getWomensProducts,
  getElectronics,
  findProduct,
};
