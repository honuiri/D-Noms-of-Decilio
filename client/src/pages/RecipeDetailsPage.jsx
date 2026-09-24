import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/organisms/Header.jsx";
import Footer from "../components/organisms/Footer.jsx";

import { deleteRecipe, getRecipe } from "../api/index.js";

function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        setLoading(true);
        setError("");

        const data = await getRecipe(id);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to load recipe:", error);
        setError("Recipe not found.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipe(id);
      navigate("/recipes");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      setError("Unable to delete this recipe.");
    }
  }

  return (
    <div className="page">
      <Header />

      <main>
        {loading && (
          <section className="page-heading">
            <p>Loading recipe...</p>
          </section>
        )}

        {!loading && error && (
          <section className="page-heading">
            <h1>Recipe not found</h1>
            <p>{error}</p>

            <Link to="/recipes">Back to Recipes</Link>
          </section>
        )}

        {!loading && !error && recipe && (
          <section className="recipe-details">
            <div className="recipe-details-image">
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                />
              )}
            </div>

            <div className="recipe-details-content">
              <p className="recipe-category">
                {recipe.category}
              </p>

              <h1>{recipe.name}</h1>

              {recipe.description && (
                <p className="recipe-description">
                  {recipe.description}
                </p>
              )}

              <section className="recipe-section">
                <h2>Ingredients</h2>

                {recipe.ingredients?.length > 0 ? (
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No ingredients added yet.</p>
                )}
              </section>

              <section className="recipe-section">
                <h2>Steps</h2>

                {recipe.steps?.length > 0 ? (
                  <ol>
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>No cooking steps added yet.</p>
                )}
              </section>

              <div className="recipe-actions">
                <Link
                  to={`/recipes/${recipe.id}/edit`}
                  className="button"
                >
                  Edit Recipe
                </Link>

                <button
                  type="button"
                  className="button"
                  onClick={handleDelete}
                >
                  Delete Recipe
                </button>

                <Link
                  to="/recipes"
                  className="button"
                >
                  Back to Recipes
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RecipeDetailsPage;