import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";

import Menu from './components/menu'

import routes from './config/routes'

function App() { 
  return (
    <AuthProvider>
      <main>
        <Menu />
        <div className="container mt-3">
          <Switch>
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
    </AuthProvider>
  );
}

export default App;
