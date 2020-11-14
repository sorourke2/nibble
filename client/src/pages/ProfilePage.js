import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default class ProfilePage extends React.Component {
  render() {
    return (
      <>
        <NavBar selectedTab="profile" />
        <div>Profile</div>
        <Footer />
      </>
    );
  }
}
