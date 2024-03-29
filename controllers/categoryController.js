const asyncHandler = require("express-async-handler");

const path = require("path");
const CategoryModel = require("../models/CategoryModel");

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap, "base64");
}

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(401);
    throw new Error("Invalid name");
  }
  let image = "";
  if (req.file) {
    const fileType = req.file.mimetype.split("/")[1];
    image =
      `data:image/${fileType};base64,` + req.file.buffer.toString("base64");
  }
  const category = await CategoryModel.create({
    name,
    description: description ? description : "",
    image,
  });
  res.status(200).json(category);
});

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.find();
  res.status(200).json(category);
});

const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findOne({ _id: req.params.id });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findOne({ _id: req.params.id });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findOne({ _id: req.params.id });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  let imagePath = category.imagePath;
  if (req.file) {
    imagePath = req.file.path;
  }
  req.body = {
    ...req.body,
    imagePath,
  };
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedCategory);
});

module.exports = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
