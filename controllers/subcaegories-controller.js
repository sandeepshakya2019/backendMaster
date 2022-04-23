const SubCategory = require("../models/subcategpries-models");
const slugify = require("slugify");

const getSubcategory = async (req, res) => {
  let subcategory;

  try {
    subcategory = await SubCategory.find().populate("category");
  } catch {
    return res.status(500).json({
      message: "Fetching sub failed, please try again.",
      code: 500,
    });
  }

  if (subcategory.length === 0) {
    return res.status(404).json({
      message: "No SubCategories Found , Please Add New.",
      code: 404,
    });
  }
  res.json({ subcategories: subcategory });
};

const getSubcaetegbasedOnCateg = async (req, res) => {
  const id = req.params.id;

  let subcategory;

  try {
    subcategory = await SubCategory.find({ category: id }).populate("category");
  } catch {
    return res.status(500).json({
      message: "Fetching sub failed, please try again.",
      code: 500,
    });
  }

  if (subcategory.length === 0) {
    return res.status(404).json({
      message: "No SubCategories Found , Please Add New.",
      code: 404,
    });
  }
  res.json({ subcategories: subcategory });
};

const postSubcategory = async (req, res) => {
  const subcateg = req.body.subcateg;
  const slugsubcateg = slugify(req.body.subcateg, { lower: true });
  const category = req.body.category;

  if (!subcateg) {
    return res
      .status(422)
      .json({ message: "Please Provide the subcateg", code: 422 });
  }

  let checkslugsubcateg;
  try {
    checkslugsubcateg = await SubCategory.findOne({
      slugsubcateg: slugsubcateg,
    });
  } catch {
    return res.status(500).json({
      message: "Fetching subcategory failed, please try again.",
      code: 500,
    });
  }
  if (checkslugsubcateg) {
    console.log("slugsubcateg is presned");
    return res.json({
      message: "Subcategory is already present",
      code: 500,
    });
  }
  const createSubCategory = new SubCategory({
    subcateg,
    slugsubcateg,
    category,
  });
  console.log(createSubCategory);
  try {
    await createSubCategory.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Creating category failed, please try again.",
      code: 500,
    });
  }

  res.status(201).json({ subcategory: createSubCategory });
};
exports.getSubcategory = getSubcategory;
exports.postSubcategory = postSubcategory;
exports.getSubcaetegbasedOnCateg = getSubcaetegbasedOnCateg;
