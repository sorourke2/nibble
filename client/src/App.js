import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import CreatedPage from "./pages/CreatedPage";
import SavedPage from "./pages/SavedPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/", "/home"]} exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <PrivateRoute
          path={["/search", "/search?:queryString"]}
          exact
          component={SearchPage}
        />
        <PrivateRoute path="/create" exact component={CreatePage} />
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <PrivateRoute path="/recipe/:id" exact component={RecipePage} />
        <PrivateRoute path="/created" exact component={CreatedPage} />
        <PrivateRoute path="/saved" exact component={SavedPage} />
        <PrivateRoute path="/user/:id" exact component={UserPage} />
        <PrivateRoute path="/admin" exact component={AdminPage} />
        <Route component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
