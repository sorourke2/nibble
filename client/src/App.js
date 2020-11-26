import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Route path={["/", "/home"]} exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route
        path={["/search", "/search?:queryString"]}
        exact
        component={SearchPage}
      />
      <Route path="/create" exact component={CreatePage} />
      <Route path="/profile" exact={true} component={ProfilePage} />
    </Router>
  );
}

export default App;
