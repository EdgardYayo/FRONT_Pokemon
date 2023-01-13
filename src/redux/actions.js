import axios from "axios";
import swa from 'sweetalert';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";


export const getPokemons = () => {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/pokemons")
        dispatch({
            type: GET_POKEMONS,
            payload: info.data
        })
    }
}


export const getTypes = () => {
    return async function(dispatch) {
        const typeInfo = await axios.get("http://localhost:3001/types")
        dispatch({
            type: GET_TYPES,
            payload: typeInfo.data
        })
    }
}



export const detailPokemon = (id) => {
    return async function(dispatch) {
        const detail = await axios.get(`http://localhost:3001/pokemons/${id}`);
        dispatch({
            type: GET_DETAIL,
            payload: detail.data
        })
    }
}


export const filterByType = (payload) => {
        return {
            type: FILTER_BY_TYPE,
            payload
        }
        
}


export const filterByName = (name) => {
    return async function(dispatch){
    try {
            const poke = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            dispatch({
                type: FILTER_BY_NAME,
                payload: poke.data
            })
        }
        catch (error) {
            swa('Pokemon not found', 'Try with other name', 'error')
        }
   }
}

export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}


export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload
    }
}

export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}


export const createPokemon = (payload) => {
    return async function(){
    try {
            const create = await axios.post("http://localhost:3001/pokemons", payload)
            return create;
        } catch (error) {
            swa("Pokemon name already exist", '', 'error')   
        }
    }
}


export const cleanPokemons = (dispatch) => {
    return dispatch({
        type: CLEAN_POKEMONS,
        payload: []
    })
}


export const cleanDetail = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: {}
    })
}

