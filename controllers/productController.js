const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// @route   POST /api/v1/products
// @desc    Add a product
// @access  public
module.exports.createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, msg: errors.array() });

  try {
    const products = await Product.create(req.body);

    res.status(201).json({ success: true, data: products });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// @route   GET /api/v1/products
// @desc    Get All products
// @access  public
module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// @route   GET /api/v1/products
// @desc    Get All products
// @access  public
module.exports.updateProduct = async (req, res) => {
  try {
    const products = await Product.findOneAndUpdate({ _id: req.user.id });

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// @route   Delete /api/v1/products
// @desc    Delete products
// @access  public
module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndRemove({ _id: req.parmas.id });

    res.status(200).json({ success: true, msg: "Data Deleted", data: [] });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

module.exports.uploadPhoto = async (req, res) => {
  try {

    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "server Error" });
  }
};
