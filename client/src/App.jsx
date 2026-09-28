import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import RecipeDetailsPage from "./pages/RecipeDetailsPage.jsx";
import AddEditRecipePage from "./pages/AddEditRecipePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Home */}
        <Route path="/home" element={<HomePage />} />

        {/* Recipe collection */}
        <Route path="/recipes" element={<RecipesPage />} />

        {/* Individual recipe */}
        <Route
          path="/recipes/:id"
          element={<RecipeDetailsPage />}
        />

        {/* Add a new recipe */}
        <Route
          path="/recipes/new"
          element={<AddEditRecipePage />}
        />

        {/* Edit an existing recipe */}
        <Route
          path="/recipes/:id/edit"
          element={<AddEditRecipePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

