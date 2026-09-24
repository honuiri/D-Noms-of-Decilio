import express from "express";

import {
  listRecipes,
  showRecipe,
  addRecipe,
  editRecipe,
  removeRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", listRecipes);
router.get("/:id", showRecipe);
router.post("/", addRecipe);
router.put("/:id", editRecipe);
router.delete("/:id", removeRecipe);

export default router;