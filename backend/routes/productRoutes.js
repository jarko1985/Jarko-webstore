import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, addProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
