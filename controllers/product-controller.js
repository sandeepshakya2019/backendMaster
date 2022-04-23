const Product = require("../models/product-model");
const slugify = require("slugify");

const getProduct = async (req, res) => {
  let product;

  try {
    product = await Product.find().populate({
      path: "SubCategory",
      populate: { path: "category" },
    });
  } catch {
    return res.status(500).json({
      message: "Fetching product failed, please try again.",
      code: 500,
    });
  }

  if (product.length === 0) {
    return res.status(404).json({
      message: "No SubCategories Found , Please Add New.",
      code: 404,
    });
  }
  res.json({ product: product });
};

const getProductbySubcategory = async (req, res) => {
  let id = req.params.id;
  let product;

  try {
    product = await Product.find({ SubCategory: id }).populate({
      path: "SubCategory",
      populate: { path: "category" },
    });
  } catch {
    return res.status(500).json({
      message: "Fetching product failed, please try again.",
      code: 500,
    });
  }

  if (product.length === 0) {
    return res.status(404).json({
      message: "No products Found on subcategory , Please Add New.",
      code: 404,
    });
  }
  res.json({ product: product });
};

const postProduct = async (req, res) => {
  const { name, description, price, SubCategory, countInStock } = req.body;
  const slugproduct = slugify(name, { lower: true });

  if (!name || !description || !price || !countInStock) {
    return res
      .status(422)
      .json({ message: "Please Provide the all fileds", code: 422 });
  }

  let checkproduct;
  try {
    checkproduct = await Product.findOne({
      slugproduct: slugproduct,
    });
  } catch {
    return res.status(500).json({
      message: "Fetching subcategory failed, please try again.",
      code: 500,
    });
  }
  if (checkproduct) {
    console.log("slugsubcateg is presned");
    return res.status(400).json({
      message: "Product is already present",
      code: 500,
    });
  }

  const createProduct = new Product({
    name,
    slugproduct,
    description,
    price,
    SubCategory,
    countInStock,
  });
  console.log(createProduct);
  try {
    await createProduct.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Creating category failed, please try again.",
      code: 500,
    });
  }

  res.status(201).json({ Product: createProduct });
};
exports.getProduct = getProduct;
exports.postProduct = postProduct;
exports.getProductbySubcategory = getProductbySubcategory;
