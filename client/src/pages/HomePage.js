import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar loggedIn={true} />
      <Footer />
    </>
  );
};

export default HomePage;
