import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/organisms/Header.jsx";
import Footer from "../components/organisms/Footer.jsx";
import RecipeCard from "../components/molecules/RecipeCard.jsx";

import { listRecipes } from "../api/index.js";

function RecipesPage() {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        setLoading(true);
        setError("");

        const data = await listRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes:", error);
        setError("Unable to load recipes.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
        setSelectedCategory(categoryFromUrl);
    } else {
        setSelectedCategory("All");
    }
    }, [searchParams]);

  const categories = [
    "All",
    "Entrée",
    "Appetizer",
    "Dessert",
    "Soup",
    "Drink",
   ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <Header />

      <main>
        <section className="page-heading">
          <h1>All Recipes</h1>
          <p>Browse the family recipe collection.</p>
        </section>

        <section className="recipe-collection">
          <div className="recipe-filters">
            <input
              type="search"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search recipes"
            />

            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
              aria-label="Filter recipes by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {loading && <p>Loading recipes...</p>}

          {!loading && error && <p>{error}</p>}

          {!loading && !error && filteredRecipes.length === 0 && (
            <p>No recipes found.</p>
          )}

          {!loading && !error && filteredRecipes.length > 0 && (
            <div className="recipe-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default RecipesPage;