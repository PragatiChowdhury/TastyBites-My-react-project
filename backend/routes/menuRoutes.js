import { Router } from "express";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/", getMenuItems);
router.get("/:id", getMenuItem);
router.post("/", protect, adminOnly, createMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

export default router;
