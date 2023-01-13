import { CLEAN_DETAIL, CLEAN_POKEMONS, CREATE_POKEMON, FILTER_BY_CREATED, FILTER_BY_NAME, FILTER_BY_TYPE, GET_DETAIL, GET_POKEMONS, GET_TYPES, ORDER_BY_ATTACK, ORDER_NAME } from "./actions";
import swa from 'sweetalert';

const initialState = {
    pokemons: [],
    allPokemons: [],
    detailPokemon: {},
    types: []
}

const rootReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detailPokemon: action.payload
            }
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'All'? allPokemons : allPokemons.filter(p => p.types.some(e => e.name === action.payload))
            function isItEmpty(arr){
                if(arr.length === 0){
                  swa('There are no pokemons with such a type', 'Please try other type', 'error')
                  return allPokemons;
                } else {
                    return arr;
                }
            }
            return {
                ...state,
                pokemons: isItEmpty(typeFiltered)
            }

        case FILTER_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
        
        case FILTER_BY_CREATED:
            let pokeCreated = state.allPokemons;
            let filterCreated;
            if(action.payload === 'created'){
               filterCreated = pokeCreated.filter(p => p.createdInDb) 
            } else if (action.payload === 'api'){
                filterCreated = pokeCreated.filter(p => !p.createdInDb);
            } else {
                filterCreated = pokeCreated;
            }

            return {
                ...state,
                pokemons: filterCreated
            }
        case ORDER_NAME:
            let pokename = state.pokemons;
            let nameOrder; 
            if(action.payload === 'asc'){
                nameOrder = pokename.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                }) 
            } else if(action.payload === 'desc') {
                nameOrder = pokename.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            } else {
                nameOrder = pokename
            }
            return {
                ...state,
                pokemons: nameOrder

            }
        case ORDER_BY_ATTACK:
            let pokeAttack = state.pokemons;
            let orderAttack = action.payload === 'asc' ? 
                pokeAttack.sort((a, b) => b.attack - a.attack) : action.payload === 'desc' ?
                pokeAttack.sort((a, b) => a.attack - b.attack) : state.pokemons;
            
            return {
                ...state,
                pokemons: orderAttack
            }
        case CREATE_POKEMON:
            return {
                ...state
            }
        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detailPokemon: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export default rootReducer;