import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Register from "./components/register";
import RegistartionThankYou from "./components/registration-thankyou";

function App() {
  const [user, setUser] = React.useState(null);

  // TO DO
  // implement secure user authentication functinality
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <main>
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
              <li className="nav-item">
                {user ? (
                  <button
                    onClick={logout}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Logout {user.name}
                  </button>
                ) : (
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user ? 
                  null
                 : (
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                )}
              </li>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/restaurants"]}
            component={RestaurantsList}
          />
          <Route
            path="/restaurants/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => <Restaurant {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
          <Route
            path="/register"
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/registration-thankyou"
            render={(props) => <RegistartionThankYou {...props} />}
          />
        </Switch>
      </div>
    </main>
  );
}

export default App;
