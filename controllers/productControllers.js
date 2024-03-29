const asyncHandler = require("express-async-handler");

const ProductsModel = require("../models/ProductsModel");
const CategoryModel = require("../models/CategoryModel");

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
//  -------------------------------------------------------Create------------------------------------------------------------//
const createProduct = asyncHandler(async (req, res) => {
  let image = [];

  const {
    name,
    brand,
    description,
    categoryId,
    purchasePrice,
    retailPrice,
    stock_qty,
    soldby,
    size,
    colour,
    For,
  } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Invalid name");
  }
  if (!For) {
    res.status(401);
    throw new Error("Invalid For");
  }
  if (!brand) {
    res.status(401);
    throw new Error("Invalid brand");
  }
  if (!size) {
    res.status(401);
    throw new Error("Invalid size");
  }
  if (!soldby) {
    res.status(401);
    throw new Error("Invalid supplier");
  }
  if (!isNumeric(purchasePrice)) {
    res.status(401);
    throw new Error("Invalid purchasePrice");
  }
  if (!isNumeric(retailPrice)) {
    res.status(401);
    throw new Error("Invalid retailPrice");
  }
  if (!isNumeric(stock_qty)) {
    res.status(401);
    throw new Error("Invalid stock_qty");
  }

  if (req.files && req.files.length > 0) {
    console.log("Image upload completed");
    try {
      image = req.files.map((file) => {
        const fileType = file.mimetype.split("/")[1]; // Extract file type
        return (
          `data:image/${fileType};base64,` + file.buffer.toString("base64")
        );
        console.log(image);
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      res.status(401);
      throw new Error("Category Not Found!!");
    }
    const updateCategory = await CategoryModel.findByIdAndUpdate(categoryId, {
      no_of_products: parseInt(category.no_of_products) + 1,
    });
  }
  try {
    const product = await ProductsModel.create({
      name,
      description: description ? description : "",
      brand: brand,
      categoryId: categoryId ? categoryId : "",
      purchasePrice: parseFloat(purchasePrice),
      retailPrice: parseFloat(retailPrice),
      soldby,
      image,
      size: size.split(","),
      colour,
      For,
      stock_qty: parseInt(stock_qty),
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});

//  -------------------------------------------------------GetALL------------------------------------------------------------//

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await ProductsModel.find().sort({ createdAt: -1 });
  res.status(200).json(products);
});

//  -------------------------------------------------------Get Category Product------------------------------------------------------------//

const getCategoryProducts = asyncHandler(async (req, res) => {
  const products = await ProductsModel.find({ categoryId: req.params.id }).sort(
    { createdAt: -1 }
  );
  res.status(200).json(products);
});
//  -------------------------------------------------------Get Single Product------------------------------------------------------------//
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await ProductsModel.findOne({ _id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

//  -------------------------------------------------------Delete Product------------------------------------------------------------//

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductsModel.findOne({ _id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const category = await CategoryModel.findById(product.categoryId);
  const updateCategory = await CategoryModel.findByIdAndUpdate(
    product.categoryId,
    {
      no_of_products: parseInt(category.no_of_products) - 1,
    }
  );
  const deletedProduct = await ProductsModel.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedProduct);
});

//  -------------------------------------------------------UpdateProduct------------------------------------------------------------//

const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductsModel.findOne({ _id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  let imagePath = product.imagePath;
  if (req.file) {
    imagePath = req.file.path;
  }
  req.body = {
    ...req.body,
    imagePath,
  };
  const updatedProduct = await ProductsModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getCategoryProducts,
  updateProduct,
  deleteProduct,
};
