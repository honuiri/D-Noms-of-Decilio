import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../atoms/Logo.jsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link to="/" className="header-logo">
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
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <div className="nav-dropdown">
          <NavLink
            to="/recipes"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </NavLink>

          <div className="nav-dropdown-menu">
            <Link to="/recipes?category=Entrée">Entrée</Link>
            <Link to="/recipes?category=Appetizer">Appetizer</Link>
            <Link to="/recipes?category=Dessert">Dessert</Link>
            <Link to="/recipes?category=Soup">Soup</Link>
            <Link to="/recipes?category=Drink">Drink</Link>
          </div>
        </div>

        <NavLink
          to="/recipes/new"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          Add Recipe
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;