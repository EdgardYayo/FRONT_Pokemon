import React from "react";
import { Link } from "react-router-dom";
import "./About.css";


export default function About(){


    return (
        <div className="about_container">
            <h2 className="about_title">About me</h2>
            <p className="about_text">Hi!! I am Edgard an enthusiastic, hardworking and friendly apprentice web developer, this project is one of the most challenging and exciting in my way to be a Full Stack web developer, in this project I use this technologies: </p>
            <ul className="about_list">
                <li>Javascript <img className="about_img"src="https://v5c2e8r4.stackpathcdn.com/wp-content/uploads/2014/09/JavaScript-logo-150x150.png" alt="tech" /></li>
                <li>React <img className="about_img"src="https://th.bing.com/th/id/OIP.K-4RqDC6zFrpAG31ayDDOgHaHa?pid=ImgDet&rs=1" alt="tech" /></li>
                <li>Express <img className="about_img"src="https://th.bing.com/th/id/OIP.ty84HDcPdT8Fxpqisfg8OgAAAA?pid=ImgDet&rs=1" alt="tech" /></li>
                <li>Postgres <img className="about_img"src="https://th.bing.com/th/id/OIP.mYjN3vNUxBxNC4E8nCzXDQAAAA?pid=ImgDet&rs=1" alt="tech" /></li>
                <li>HTML <img className="about_img"src="https://pngpress.com/wp-content/uploads/2020/04/HTML-logo-150x150.png" alt="tech" /></li>
                <li>CSS <img className="about_img"src="https://th.bing.com/th/id/OIP.MhpGiwk1tSBNfLNWo0K-UAAAAA?pid=ImgDet&rs=1" alt="tech" /></li>
            </ul>
            <Link to="/">
                <button className="about_button">Landing Page</button>
            </Link>
        </div>
    )
}