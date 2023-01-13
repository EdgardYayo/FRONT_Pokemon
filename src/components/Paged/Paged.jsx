import React from "react";
import { Link } from "react-router-dom";
import './Paged.css';



export default function Paged({ pokePerPage, pokemons, paged, currentPage }) {
  let pagedNumbers = [];
  for (let i = 1; i <= Math.ceil(pokemons / pokePerPage); i++) {
    pagedNumbers.push(i)
  }

  const max = Math.max(...pagedNumbers)

  return (
    <div className="paged">
      <div className="lista">
        <Link to='/'>
          <button className="paged_button">Landing Page</button>
        </Link>
        <button onClick={ currentPage > 1 ? () => paged(currentPage - 1) : null}
        disabled={currentPage === 1 ? true : false}>🢢</button>
        {pagedNumbers && pagedNumbers.map((number, i) => (
          <div className="anchor">
            <button className="anchor" id="p_paged" key={i} onClick={() => paged(number)}>{number}</button>
          </div>
        ))}
        <button onClick={ currentPage < max ? () => paged(currentPage + 1) : null}
        disabled={currentPage === max ? true : false}>🢣</button>
      </div>
    </div>

  )
}