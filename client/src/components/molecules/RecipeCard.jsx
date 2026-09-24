import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="recipe-card-link"
    >
      <article className="recipe-card">
        {recipe.image_url ? (
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="recipe-image"
          />
        ) : (
          <div className="recipe-image recipe-image-placeholder">
            No image
          </div>
        )}

        <h3>{recipe.name}</h3>
        <p>{recipe.category}</p>
      </article>
    </Link>
  );
}

export default RecipeCard;