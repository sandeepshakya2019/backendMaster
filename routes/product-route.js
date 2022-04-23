const express = require("express");
const ProductController = require("../controllers/product-controller");

const Route = express.Router();

Route.get("/", ProductController.getProduct);
Route.get("/:id", ProductController.getProductbySubcategory);
Route.post("/", ProductController.postProduct);

module.exports = Route;
