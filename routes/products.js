const { Router } = require("express");
const router = Router();

const productController = require("../controllers/productController");

const { body } = require("express-validator");

const auth = require("../middleware/auth");

router.post(
  "/",
  [
    body("productName", "product name is required").not().isEmpty(),
    body("productDescription", "product Description is required")
      .not()
      .isEmpty(),
    body("productVarieties", "product Varieties is required").not().isEmpty(),
  ],
  productController.createProduct
);

router.post("/upload", productController.uploadPhoto);

router.get("/", productController.getProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
