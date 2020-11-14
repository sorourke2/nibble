import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Route path={["/", "/home"]} exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/create" exact component={CreatePage} />
      <Route path="/profile" exact={true} component={ProfilePage} />
    </BrowserRouter>
  );
}

export default App;
