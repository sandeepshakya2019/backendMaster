const express = require("express");
const mongoose = require("mongoose");
const categoriesRoute = require("./routes/categories-route");
const subcaegoriesRoute = require("./routes/subcaegories-route");
const productRoute = require("./routes/product-route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoriesRoute);
app.use("/subcategories", subcaegoriesRoute);
app.use("/products", productRoute);

mongoose
  .connect("mongodb://localhost:27017/ecom")
  .then(() => {
    console.log("[+] Database Connected ...");
    app.listen(5000, () => {
      console.log("[+] Server is Running ...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
