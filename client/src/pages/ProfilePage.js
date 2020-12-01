import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  return (
    <>
      <NavBar selectedTab="profile" loggedIn={true} />
      <div>Profile</div>
      <Footer />
    </>
  );
};

export default ProfilePage;
