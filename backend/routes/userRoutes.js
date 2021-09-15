import express from "express";
const router = express.Router();
import {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(signup);
router.post("/login", login);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//ADMIN ROUTES
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

//can be written like the below as well
// router
//   .route("/:id")
//   .get(protect, admin, getUserById)
//   .get(protect, admin, getUserById)
//   .delete(protect, admin, deleteUser);

export default router;
