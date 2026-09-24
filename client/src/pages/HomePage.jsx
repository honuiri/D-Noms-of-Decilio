import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/organisms/Header.jsx";
import Footer from "../components/organisms/Footer.jsx";
import RecipeCard from "../components/molecules/RecipeCard.jsx";

import { listRecipes } from "../api/index.js";

function HomePage() {
  const [newlyAddedRecipes, setNewlyAddedRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(0);

  useEffect(() => {
    async function loadNewestRecipes() {
      try {
        const recipes = await listRecipes();

        const newest = recipes
          .slice()
          .sort(
            (a, b) =>
              new Date(b.created_at) - new Date(a.created_at)
          )
          .slice(0, 3);

        setNewlyAddedRecipes(newest);
      } catch (error) {
        console.error("Failed to load newest recipes:", error);
      }
    }

    loadNewestRecipes();
  }, []);

  function previousRecipe() {
    setCurrentRecipe((current) =>
      current === 0
        ? newlyAddedRecipes.length - 1
        : current - 1
    );
  }

  function nextRecipe() {
    setCurrentRecipe((current) =>
      current === newlyAddedRecipes.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <div className="page">
      <Header />

      <main>
        <section className="hero">
          <img
            src="/assets/slogan.png"
            alt="Do Not Disturb"
            className="hero-slogan"
          />

          <p>Decilio Family Recipe Archive</p>
        </section>

        <section className="home-section">
          <h2>Newly added recipes</h2>

          <div className="recipe-carousel">
            <button
              className="carousel-arrow carousel-prev"
              onClick={previousRecipe}
              aria-label="Previous recipe"
              disabled={newlyAddedRecipes.length === 0}
            >
              ‹
            </button>

            <div className="recipe-grid">
              {newlyAddedRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className={
                    index === currentRecipe
                      ? "carousel-recipe active"
                      : "carousel-recipe"
                  }
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            <button
              className="carousel-arrow carousel-next"
              onClick={nextRecipe}
              aria-label="Next recipe"
              disabled={newlyAddedRecipes.length === 0}
            >
              ›
            </button>
          </div>

          <Link to="/recipes" className="all-recipes-button">
            All Recipes
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;