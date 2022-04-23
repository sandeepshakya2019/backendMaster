const Category = require("../models/categories-model");
const slugify = require("slugify");

const getCategory = async (req, res) => {
  let categories;

  try {
    categories = await Category.find();
  } catch {
    return res.status(500).json({
      message: "Fetching category failed, please try again.",
      code: 500,
    });
  }

  if (categories.length === 0) {
    return res.status(404).json({
      message: "No Categories Found , Please Add New.",
      code: 404,
    });
  }
  res.json({ categories: categories });
};

const postCategory = async (req, res) => {
  const name = req.body.name;
  const slugcateg = slugify(req.body.name, { lower: true });

  if (!name) {
    return res.json({ message: "Please Provide the name", code: 422 });
  }
  let checkSlug;
  try {
    checkSlug = await Category.findOne({ slugcateg: slugcateg });
  } catch {
    return res.status(500).json({
      message: "Fetching subcategory failed, please try again.",
      code: 500,
    });
  }
  if (checkSlug) {
    console.log("slug is presned");
    return res.json({
      message: "Category is already present",
      code: 500,
    });
  }
  const createCategory = new Category({
    name,
    slugcateg,
  });

  try {
    await createCategory.save();
  } catch (err) {
    return res.status(500).josn({
      message: "Creating category failed, please try again.",
      code: 500,
    });
  }

  res.status(201).json({ category: createCategory });
};
exports.getCategory = getCategory;
exports.postCategory = postCategory;
