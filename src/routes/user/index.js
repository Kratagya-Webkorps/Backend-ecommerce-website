const router = require("express").Router();
const { serializeUser } = require("../../controllers/auth");

const {
  getProductById,
  getProductByCategory,
  addProductToCart,
  getAllCartProducts,
  getProductByName,
  addProductToWishlist,
  getAllWishlistProducts,
} = require("../../controllers/products");

router.get("/", async (req, res) => {
  return res.status(200).json({ type: "user", user: serializeUser(req.user) });
});

router.get("/get-product/:id", getProductById);
router.get("/name/:name", getProductByName); // Add the route

router.get("/get-product-category/:category", getProductByCategory);
router.post("/add-to-cart", addProductToCart);
router.post("/get-cart", getAllCartProducts);
router.post("/add-to-wishlist", addProductToWishlist);
router.post("/get-wishlist", getAllWishlistProducts);

module.exports = router;
