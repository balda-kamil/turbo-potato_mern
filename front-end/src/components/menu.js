import React from 'react'
import { useAuthState } from "../Context";
import { Link } from "react-router-dom";

const Menu = () => {

  React.useEffect(() => {
    console.log('Use Effect in MENU component!')
  })

  console.log('menu sie renderuje na nowo?!')
  const user = useAuthState();

  console.log(user)

  return (
    <div className="bg-dark">
      <div className="container">
        <nav className="navbar navbar-expand navbar-dark">
          <a href="/restaurants" className="navbar-brand">
            Restaurant Reviews
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>

            {user.userDetails ? (
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : (
              <div style={{display: "flex"}}>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
