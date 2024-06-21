const router = require("express").Router();
const { serializeUser } = require("../../controllers/auth");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products");


router.get("/", async (req, res) => {
  return res.status(200).json({ type: "admin", user: serializeUser(req.user) });
});

router.get("/getall", getAllProducts);
router.get("/:id", getProductById);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
