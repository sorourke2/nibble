import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default class CreatePage extends React.Component {
  render() {
    return (
      <>
        <NavBar selectedTab="create" />
        <div>Create</div>
        <Footer />
      </>
    );
  }
}
