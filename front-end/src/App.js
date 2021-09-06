import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Register from "./components/register";
import RegistartionThankYou from "./components/registration-thankyou";
import Dashboard from "./components/dashboard";
import AppRoute from './components/AppRoutes';

function App() {  
  return (
    <AuthProvider>
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
                  <button
                    onClick={() => console.log('LOG OUT')}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >Logout</button>

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
              render={(props) => <AddReview {...props} />}
            />
            <Route
              path="/restaurants/:id"
              render={(props) => <Restaurant {...props} />}
            />
            <Route
              path="/login"
              render={(props) => <Login {...props}  />}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              path="/registration-thankyou"
              render={(props) => <RegistartionThankYou {...props} />}
            />
            <Route
              path="/dashboard"
              isPrivate={true}
              render={(props) => <Dashboard {...props} />}
            />
            <AppRoute
              key="dfkjsdfkjfd"
              path={"/dashboard"}
              component={Dashboard}
              isPrivate={true}
            />
          </Switch>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;
