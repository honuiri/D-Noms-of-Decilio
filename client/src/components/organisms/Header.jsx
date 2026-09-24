import { NavLink, Link } from "react-router-dom";

import Logo from "../atoms/Logo.jsx";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="header-logo">
        <Logo />
      </Link>

      <nav className="navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/recipes"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Recipes
        </NavLink>

        <NavLink
          to="/recipes/new"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add Recipe
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;