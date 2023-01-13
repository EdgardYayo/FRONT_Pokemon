import React from "react";
import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage(){
  return (
    <section className="principal">
      <Link className="link_landing"to="/home">
        <h1 className="content">POKEM<img className="img" src="https://th.bing.com/th/id/R.842555425a7843c73c9a9daf6cf736f4?rik=NlR%2bL3nuo1PZJQ&pid=ImgRaw&r=0" alt="pokeball"/>N</h1>
      </Link>
      <Link to="/about">
        <button className="landing_button">About Me</button>
      </Link>
    </section>
  )

}