const router = require("express").Router();
const { serializeUser } = require("../../controllers/auth");

const { getProductById } = require("../../controllers/products");

router.get("/", async (req, res) => {
  return res.status(200).json({ type: "user", user: serializeUser(req.user) });
});

router.get("/:id", getProductById);
module.exports = router;
