import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, detailPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";
import './Detail.css'




export default function Detail({ id }) {

  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.detailPokemon)

  useEffect(() => {
    window.scrollTo(0,0)
  },[dispatch])

  useEffect(() => {
    dispatch(detailPokemon(id))
    return () => {
      dispatch(cleanDetail(dispatch))
    }
  }, [dispatch, id])


  return (
    <div className="contenido">
      <h1 className="alias">{pokemon.name}</h1>
      <img className="picture" src={pokemon.img} alt="pokemon" />
      <div className="second-container">
        <h3><strong>Life: </strong>{pokemon.hp}</h3>
        <h3><strong>Attack: </strong>{pokemon.attack}</h3>
        <h3><strong>Defense: </strong>{pokemon.defense}</h3>
        <h3><strong>Speed: </strong>{pokemon.speed}</h3>
        <h3><strong>Height: </strong>{pokemon.height}</h3>
        <h3><strong>Weight: </strong>{pokemon.weight}</h3>
        <h3><strong>Types: </strong>{pokemon.types?.map(t => {
          return (
            ' ' + t.name
          )
        })}</h3>
      </div>
      <Link to='/home'>
        <button className="button_detail">Back to Home</button>
      </Link>
    </div>
  )
}