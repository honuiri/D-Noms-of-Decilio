import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/organisms/Header.jsx";
import Footer from "../components/organisms/Footer.jsx";

import {
  createRecipe,
  getRecipe,
  updateRecipe,
} from "../api/index.js";

const emptyRecipe = {
  name: "",
  description: "",
  image_url: "",
  ingredients: [""],
  steps: [""],
  category: "Main Dish",
};

function AddEditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(emptyRecipe);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    async function loadRecipe() {
      try {
        setLoading(true);
        setError("");

        const recipe = await getRecipe(id);

        setFormData({
          name: recipe.name || "",
          description: recipe.description || "",
          image_url: recipe.image_url || "",
          ingredients:
            recipe.ingredients?.length > 0
              ? recipe.ingredients
              : [""],
          steps:
            recipe.steps?.length > 0
              ? recipe.steps
              : [""],
          category: recipe.category || "Main Dish",
        });
      } catch (error) {
        console.error("Failed to load recipe:", error);
        setError("Unable to load this recipe.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleIngredientChange(index, value) {
    setFormData((current) => {
      const ingredients = [...current.ingredients];
      ingredients[index] = value;

      return {
        ...current,
        ingredients,
      };
    });
  }

  function handleStepChange(index, value) {
    setFormData((current) => {
      const steps = [...current.steps];
      steps[index] = value;

      return {
        ...current,
        steps,
      };
    });
  }

  function addIngredient() {
    setFormData((current) => ({
      ...current,
      ingredients: [...current.ingredients, ""],
    }));
  }

  function removeIngredient(index) {
    setFormData((current) => ({
      ...current,
      ingredients: current.ingredients.filter(
        (_, ingredientIndex) => ingredientIndex !== index
      ),
    }));
  }

  function addStep() {
    setFormData((current) => ({
      ...current,
      steps: [...current.steps, ""],
    }));
  }

  function removeStep(index) {
    setFormData((current) => ({
      ...current,
      steps: current.steps.filter(
        (_, stepIndex) => stepIndex !== index
      ),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const recipe = {
      ...formData,
      ingredients: formData.ingredients
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      steps: formData.steps
        .map((step) => step.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await updateRecipe(id, recipe);
      } else {
        await createRecipe(recipe);
      }

      navigate("/recipes");
    } catch (error) {
      console.error("Failed to save recipe:", error);
      setError("Unable to save the recipe. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <Header />

        <main>
          <section className="page-heading">
            <p>Loading recipe...</p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main>
        <section className="page-heading">
          <h1>{isEditing ? "Edit Recipe" : "Add Recipe"}</h1>

          <p>
            {isEditing
              ? "Update this family recipe."
              : "Create a new family recipe."}
          </p>
        </section>

        <section className="recipe-form-section">
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Recipe Name</label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Main Dish">Main Dish</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Dessert">Dessert</option>
                <option value="Soup">Soup</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL</label>

              <input
                id="image_url"
                name="image_url"
                type="text"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/recipe-image.jpg"
              />
            </div>

            <fieldset className="form-group">
              <legend>Ingredients</legend>

              {formData.ingredients.map((ingredient, index) => (
                <div className="form-list-item" key={index}>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(event) =>
                      handleIngredientChange(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Ingredient ${index + 1}`}
                  />

                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addIngredient}
              >
                Add Ingredient
              </button>
            </fieldset>

            <fieldset className="form-group">
              <legend>Steps</legend>

              {formData.steps.map((step, index) => (
                <div className="form-list-item" key={index}>
                  <textarea
                    value={step}
                    onChange={(event) =>
                      handleStepChange(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Step ${index + 1}`}
                    rows="3"
                  />

                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addStep}
              >
                Add Step
              </button>
            </fieldset>

            <div className="form-actions">
              <button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Add Recipe"}
              </button>

              <Link to="/recipes">
                Cancel
              </Link>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AddEditRecipePage;