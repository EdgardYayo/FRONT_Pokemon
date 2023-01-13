import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { cleanPokemons, getPokemons } from "../../redux/actions";
import Paged from "../Paged/Paged";
import Nav from "../Nav/Nav";
import Loader from "../Loader/Loader";
import './Home.css'

export default function Home() {

  const dispatch = useDispatch()
  const pokemons = useSelector(state => state.pokemons);

  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage] = useState(12);
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPokemons = pokemons?.slice(indexOfFirstPoke, indexOfLastPoke);


  const paged = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanPokemons(dispatch));
    dispatch(getPokemons());
  }

  return (
    <div>
      <div className="homenav">
        <Nav setCurrentPage={setCurrentPage} setOrder={setOrder}/>  
        <button className="buhome" onClick={e => handleClick(e)}>
          Reset Pokemons and Filters
        </button>
        <Link to='/form'>
          <button className="buhome2">
            Create Your Pokemon
          </button>
        </Link>
      </div>
      <div className="home">
        {currentPokemons.length && currentPokemons ? currentPokemons?.map((p, index) => {
          return (
            <Link className="link_home" key={index} to={'/pokemon/' + p.id}>
              <Pokemon
                key={p.id}
                img={p.img}
                name={p.name}
                types={p.types.map(t => {
                  return (
                   ' ' + t.name
                  )
                }
                )}
              />
            </Link>
          )
        }
      ) : <Loader/>}
      </div>
      <Paged
        pokePerPage={pokePerPage}
        pokemons={pokemons.length}
        paged={paged}
        currentPage={currentPage} />
    </div>

  )
}