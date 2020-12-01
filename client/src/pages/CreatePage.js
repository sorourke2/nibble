import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CreatePage = () => {
  return (
    <>
      <NavBar selectedTab="create" loggedIn={true} />
      <div>Create</div>
      <Footer />
    </>
  );
};

export default CreatePage;
