const { json } = require("express");
const express = require("express");
const classCart = require("../classes/cartClass.js");
const CartClass = new classCart();
const router = express.Router();

router.post("/", (req, res) => {
  CartClass.create();
});
router.delete("/:id", (req, res) => {
  CartClass.delete(req.params.id);
});
router.get("/:id/productos", (req, res) => {
  CartClass.insertProduct(req.params.id);
});

module.exports = router;
