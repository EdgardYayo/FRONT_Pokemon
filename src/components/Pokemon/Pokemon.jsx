import React from "react";
import './Pokemon.css'


export default function Pokemon({name, img, types}){
    return (
        <div className="container">
            <img className="image" src={img} alt="pokemon"/>
            <h3 className="name">{name.slice(0,1).toUpperCase() + name.slice(1)}</h3>
            <h4 className="types">{types}</h4>
        </div>
    )
}