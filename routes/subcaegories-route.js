const express = require("express");
const SubCategoryController = require("../controllers/subcaegories-controller");

const Route = express.Router();

Route.get("/", SubCategoryController.getSubcategory);
Route.get("/:id", SubCategoryController.getSubcaetegbasedOnCateg);
Route.post("/", SubCategoryController.postSubcategory);

module.exports = Route;
