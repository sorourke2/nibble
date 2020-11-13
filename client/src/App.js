import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/HomeComponent";
import ProfileComponent from "./components/ProfileComponent";
import SearchComponent from "./components/SearchComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <BrowserRouter>
      <Route path={["/", "/home"]} exact component={HomeComponent} />
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/profile" exact={true} component={ProfileComponent} />
      <Route path="/search" exact component={SearchComponent} />
    </BrowserRouter>
  );
}

export default App;
