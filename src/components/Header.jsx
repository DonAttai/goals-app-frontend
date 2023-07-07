import React from "react";
import { Button } from "react-bootstrap";
import authService from "../service/auth-service";

import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  let { user, dispatch } = useAuthContext();

  const logUserOut = () => {
    authService.logOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">GoalSetter</div>
        <ul className="nav">
          {user ? (
            <>
              <li>
                <Button className="btn btn-dark btn-sm" onClick={logUserOut}>
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
