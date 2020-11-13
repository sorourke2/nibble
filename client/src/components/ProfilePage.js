import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default class ProfilePage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div>Profile</div>
        <Footer />
      </>
    );
  }
}
