const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require("./products");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
const port = 3000;
const uri =
  "mongodb+srv://dientcph27512:mvptcd2003@trinhcongdien.usquknr.mongodb.net/Product?retryWrites=true&w=majority";
app.get("/", async (req, res) => {
  await mongoose.connect(uri).then(console.log("connect success"));
  let listProducts = await ProductModel.find();
  // console.log(listProducts);
  res.render("home", {
    layout: "main",
    product: listProducts.map((product) => product.toObject()),
  });
});
app.post("/add", async (req, res) => {
  let product = {
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
  };
  try {
    await mongoose.connect(uri).then(console.log("connect success"));
    await ProductModel.insertMany(product);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});
app.post("/delete", async (req, res) => {
  try {
    await mongoose.connect(uri).then(console.log("connect success"));
    await ProductModel.deleteOne({ _id: req.body.id });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
app.post("/edit", async (req, res) => {
  try {
    await mongoose.connect(uri).then(console.log("connect success"));
    const product = await ProductModel.findOne({ _id: req.body.id });
    if (product) {
      product.name = req.body.name;
      product.color = req.body.color;
      product.price = req.body.price;
      await product.save();
      res.redirect("/");
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
