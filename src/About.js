import React from "react";
import logo from "./logo.svg";
import Layout from "./Layout";
import { MdPerson } from "react-icons/md";
const About = () => {
  return (
    <div className="home">
      <header className="App-header">
        <Layout />
        <MdPerson />
        <p>R-Ansh About Page</p>
      </header>
    </div>
  );
};

export default About;
