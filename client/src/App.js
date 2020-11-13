import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import CreatePage from "./components/CreatePage";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";

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
