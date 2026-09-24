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
  const [menuOpen, setMenuOpen] = useState(false);

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
      setMenuOpen(false);
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

  if (error || !recipe) {
    return (
      <div className="page">
        <Header />

        <main>
          <section className="page-heading recipe-not-found">
            <h1>Recipe not found</h1>
            <p>{error}</p>

            <Link to="/recipes" className="recipe-back-link">
              Back to Recipes
            </Link>
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
        <section className="recipe-details-page">

          {/* Back button */}
          <Link to="/recipes" className="recipe-details-back">
            ‹ Back
          </Link>

          {/* Recipe overview */}
          <section className="recipe-overview">

            <div className="recipe-details-image">
              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                />
              ) : (
                <div className="recipe-details-image-placeholder">
                  No image
                </div>
              )}
            </div>

            <div className="recipe-details-info">

              <div className="recipe-details-title-row">
                <div>
                  <h1>{recipe.name}</h1>

                  <p className="recipe-details-category">
                    Category: {recipe.category}
                  </p>
                </div>

                {/* Three-dot menu */}
                <div className="recipe-menu">
                  <button
                    type="button"
                    className="recipe-menu-button"
                    onClick={() => setMenuOpen((current) => !current)}
                    aria-label="Recipe options"
                    aria-expanded={menuOpen}
                  >
                    ⋮
                  </button>

                  {menuOpen && (
                    <div className="recipe-menu-dropdown">
                      <Link
                        to={`/recipes/${recipe.id}/edit`}
                        onClick={() => setMenuOpen(false)}
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="recipe-details-divider" />

              {recipe.description && (
                <p className="recipe-details-description">
                  {recipe.description}
                </p>
              )}

              {recipe.created_at && (
                <p className="recipe-details-date">
                  date added:{" "}
                  {new Date(recipe.created_at).toLocaleDateString()}
                </p>
              )}
            </div>

          </section>

          {/* Ingredients and steps */}
          <section className="recipe-content">

            <section className="recipe-ingredients">
              <h2>Ingredients</h2>

              {recipe.ingredients?.length > 0 ? (
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients added yet.</p>
              )}
            </section>

            <section className="recipe-steps">
              <h2>Cooking steps</h2>

              {recipe.steps?.length > 0 ? (
                <ol>
                  {recipe.steps.map((step, index) => (
                    <li key={index}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p>No cooking steps added yet.</p>
              )}
            </section>

          </section>

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default RecipeDetailsPage;