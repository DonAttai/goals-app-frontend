import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">GoalSetter</div>
        <ul className="nav">
          {user ? (
            <>
              <li>
                <Button
                  // href="/login"
                  className="btn btn-dark btn-sm"
                  onClick={() => logout()}
                >
                  <FaSignOutAlt />
                  LogOut
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-item">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-item">
                  <FaUser />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
