import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../atoms/Logo.jsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setRecipesOpen(false);
  };

  return (
    <header className="site-header">
      <Link to="/" className="header-logo" onClick={closeMenu}>
        <Logo />
      </Link>

      <button
        className="hamburger-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <nav className={`navigation ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <div className={`nav-dropdown ${recipesOpen ? "mobile-open" : ""}`}>
          <div className="recipes-nav-row">
            <NavLink
              to="/recipes"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              Recipes
            </NavLink>

            <button
              className="recipes-toggle"
              onClick={() => setRecipesOpen(!recipesOpen)}
              aria-label="Toggle recipe categories"
              aria-expanded={recipesOpen}
            >
              {recipesOpen ? "⌃" : "⌄"}
            </button>
          </div>

          <div className="nav-dropdown-menu">
            <Link
              to="/recipes?category=Entrée"
              onClick={closeMenu}
            >
              Entrée
            </Link>

            <Link
              to="/recipes?category=Appetizer"
              onClick={closeMenu}
            >
              Appetizer
            </Link>

            <Link
              to="/recipes?category=Dessert"
              onClick={closeMenu}
            >
              Dessert
            </Link>

            <Link
              to="/recipes?category=Soup"
              onClick={closeMenu}
            >
              Soup
            </Link>

            <Link
              to="/recipes?category=Drink"
              onClick={closeMenu}
            >
              Drink
            </Link>
          </div>
        </div>

        <NavLink
          to="/recipes/new"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={closeMenu}
        >
          Add Recipe
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;