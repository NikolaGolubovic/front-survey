import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header({ user }) {
  const [logoVisible, setLogoVisible] = useState(true);
  const notification = useSelector((state) => state);

  useEffect(() => {
    if (notification.errors.length > 0 || notification.infos.length > 0) {
      setLogoVisible(false);
    } else {
      setLogoVisible(true);
    }
  }, [notification.errors.length, notification.infos.length, user]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <header>
      <nav roleplay="navigation">
        <img
          src="/img/pie.jpg"
          alt="Pie Chart Logo"
          style={{ visibility: logoVisible ? "visible" : "hidden" }}
        />
        <div className="nav-links">
          {user ? (
            <>
              <button className="user-name">
                <FontAwesomeIcon icon={faUser} /> {user}
              </button>
              <NavLink exact to="/" activeClassName="nav-active">
                Homepage
              </NavLink>
              <NavLink
                exact
                to="/api/survey/create"
                activeClassName="nav-active"
              >
                Create Survey
              </NavLink>

              <button className="user-control" onClick={logOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink exact to="/" activeClassName="nav-active">
                Homepage
              </NavLink>
              <NavLink to="/register" activeClassName="nav-active">
                Sign Up
              </NavLink>
              <NavLink to="/login" activeClassName="nav-active">
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
