import { Router } from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweets.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// Sweets (Protected)
router.post("/", authenticate, addSweet);
router.get("/", authenticate, getAllSweets);
router.get("/search", authenticate, searchSweets);
router.put("/:id", authenticate, updateSweet);
router.delete("/:id", authenticate, isAdmin, deleteSweet);

// Inventory (Protected)
router.post("/:id/purchase", authenticate, purchaseSweet);
router.post("/:id/restock", authenticate, isAdmin, restockSweet);

export default router;
