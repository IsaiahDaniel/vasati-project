const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productVarieties: [
    {
      size: String,
      color: String,
      quantity: String,
      price: String,
    },
  ],
  dateEdited: {
    type: Date,
    default: Date.now(),
  },
  dateUploaded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", productSchema);
