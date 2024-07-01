import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import "./MainNavigation.css";

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
