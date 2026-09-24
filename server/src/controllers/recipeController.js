import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../repositories/recipeRepository.js";

function validateRecipe(body) {
  const errors = [];

  const name =
    typeof body.name === "string" ? body.name.trim() : "";

  const description =
    typeof body.description === "string"
      ? body.description.trim()
      : "";

  const image_url =
    typeof body.image_url === "string"
      ? body.image_url.trim()
      : "";

  const category =
    typeof body.category === "string"
      ? body.category.trim()
      : "";

  const ingredients = Array.isArray(body.ingredients)
    ? body.ingredients
        .filter((ingredient) => typeof ingredient === "string")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean)
    : [];

  const steps = Array.isArray(body.steps)
    ? body.steps
        .filter((step) => typeof step === "string")
        .map((step) => step.trim())
        .filter(Boolean)
    : [];

  if (!name) {
    errors.push("name is required");
  }

  if (name.length > 150) {
    errors.push("name must be 150 characters or fewer");
  }

  if (description.length > 2000) {
    errors.push(
      "description must be 2000 characters or fewer"
    );
  }

  if (!category) {
    errors.push("category is required");
  }

  return {
    errors,
    value: {
      name,
      description,
      image_url,
      ingredients,
      steps,
      category,
    },
  };
}

export async function listRecipes(req, res) {
  try {
    const recipes = await getAllRecipes();

    res.json(recipes);
  } catch (error) {
    console.error("Failed to get recipes:", error);

    res.status(500).json({
      error: "Failed to get recipes",
    });
  }
}

export async function showRecipe(req, res) {
  try {
    const recipe = await getRecipeById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
      });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Failed to get recipe:", error);

    res.status(500).json({
      error: "Failed to get recipe",
    });
  }
}

export async function addRecipe(req, res) {
  const { errors, value } = validateRecipe(req.body ?? {});

  if (errors.length > 0) {
    return res.status(400).json({
      error: errors.join("; "),
    });
  }

  try {
    const recipe = await createRecipe(value);

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Failed to create recipe:", error);

    res.status(500).json({
      error: "Failed to create recipe",
    });
  }
}

export async function editRecipe(req, res) {
  const { errors, value } = validateRecipe(req.body ?? {});

  if (errors.length > 0) {
    return res.status(400).json({
      error: errors.join("; "),
    });
  }

  try {
    const recipe = await updateRecipe(req.params.id, value);

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
      });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Failed to update recipe:", error);

    res.status(500).json({
      error: "Failed to update recipe",
    });
  }
}

export async function removeRecipe(req, res) {
  try {
    const deleted = await deleteRecipe(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Recipe not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete recipe:", error);

    res.status(500).json({
      error: "Failed to delete recipe",
    });
  }
}