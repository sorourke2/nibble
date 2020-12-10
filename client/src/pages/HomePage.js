import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <>
      <NavBar loggedIn />
      <Footer />
    </>
  ) : (
    <>
      <NavBar loggedIn={false} />
      <Footer />
    </>
  );
};

export default HomePage;
