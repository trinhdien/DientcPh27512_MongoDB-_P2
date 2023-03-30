const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    color: {
      type: "string",
      required: true,
    },
    price: {
      type: "string",
      required: true,
    },
  },
  {
    collection: "Products",
  }
);
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
