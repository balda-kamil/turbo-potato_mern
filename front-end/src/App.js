import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './components/menu'
import routes from './config/routes'

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";

import { useAuthState } from "./Context";

function App() { 

   const userDetails = useAuthState()

  return (
    
      <main>
        <Menu />
        <div className="container mt-3">
          <Switch>
          <Route
            key="add-review"
            path="/restaurants/:id/review"
            exact
            render={(props) => <AddReview {...props} userDetails={userDetails} />}
          />
          <Route
            key="restaurant"
            path="/restaurants/:id"
            exact
            render={(props) => <Restaurant {...props} userDetails={userDetails} />}
          />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </div>
      </main>
  );
}

export default App;
