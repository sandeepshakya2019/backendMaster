const express = require("express");
const CategoriesController = require("../controllers/categories-controller");

const Route = express.Router();

Route.get("/", CategoriesController.getCategory);
Route.post("/", CategoriesController.postCategory);

module.exports = Route;
