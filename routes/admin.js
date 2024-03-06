const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body(
      "title",
      "Please enter a title with only numbers and text and at least 3 characters"
    )
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl").isURL().withMessage("Please enter a valid URL"),
    body("price").isFloat().withMessage("Price must be a number"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .withMessage(
        "Please enter at least 5 characters in the description field"
      )
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body(
      "title",
      "Please enter a title with only numbers and text and at least 3 characters"
    )
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl").isURL().withMessage("Please enter a valid URL"),
    body("price").isFloat().withMessage("Price must be a number"),
    body("description")
      .isLength({ min: 5, max: 400 })
      .withMessage(
        "Please enter at least 5 characters in the description field"
      )
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
