import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypes } from "../../redux/actions";
import './Form.css';
import swa from 'sweetalert';


export default function Form () {

    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const [error, setError] = useState({})
    const history = useHistory();

    const [input, setInput] = useState({
        name: '', 
        hp: 0, 
        attack: 0, 
        defense: 0, 
        speed: 0,
        height: 0, 
        weight: 0, 
        types: [],
        img: ''
    })

    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
            
    const validate = (input) => {
        let error = {};
        if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
        error.name = "Name required. Only string of more than two characters and without numbers";
        }
        if (!validateNum.test(input.hp) || parseInt(input.hp) < 1 ) {
            error.hp = "Number required. Higher than one";
        }
        if (!validateNum.test(input.attack) || parseInt(input.attack) < 1) {
            error.attack = "Number required. Higher than one";
        }
        if (!validateNum.test(input.defense) || parseInt(input.defense) < 1) {
            error.defense = "Number required. Higher than one";
        }
        if (!validateNum.test(input.speed) || parseInt(input.speed) < 1) {
            error.speed = "Number required. Higher than one";
        }
        if (!validateNum.test(input.height) || parseInt(input.height) < 1) {
            error.height = "Number required. Higher than one";
        }
        if (!validateNum.test(input.weight) || parseInt(input.weight) < 1) {
            error.weight = "Number required. Higher than one";
        }
        if (!validateUrl.test(input.img)) {
        error.img = "URL is required";
        }

        return error;
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value

        });

        setError(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    const handleSelect = (e) => {
        if(input.types.includes(e.target.value)){
            swa('You must select different types', 'select other type', 'error')
        } else if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            e.target.value = 'Select type';
        } else {
            swa('Two types of pokemon at most', 'you can only select 2 types', 'error')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            !error.name &&
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.height &&
            !error.weight &&
            !error.img 
        ) {
            dispatch(createPokemon(input));
            setInput({
                name: '', 
                hp: 0, 
                attack: 0, 
                defense: 0, 
                speed: 0,
                height: 0, 
                weight: 0, 
                types: [],
                img: ''

            });
            history.push('/home')
            swa('New pokemon has been created', 'Enjoy your new creation', 'success')
        } else {
            swa('Error. Check the form', 'Maybe you are missing somenthing', 'error')
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    return(
        <form className="pokeform" onSubmit={e => handleSubmit(e)}>
            <h2>Create Your Pokemon!!</h2>
            <Link to='/home'>
                <button className="button_form">Back Home</button>
            </Link>
            <label>Name:</label>
            <input value={input.name} placeholder="name" name='name'onChange={e => handleChange(e)}/>
            <p>{error.name}</p>
            <label>HP:</label>
            <input value={input.hp} placeholder="HP" name='hp'onChange={e => handleChange(e)}/>
            <p>{error.hp}</p>
            <label>Attack:</label>
            <input value={input.attack} placeholder="Attack" name='attack'onChange={e => handleChange(e)}/>
            <p>{error.attack}</p>
            <label>Defense:</label>
            <input value={input.defense} placeholder="Defense" name='defense'onChange={e => handleChange(e)}/>
            <p>{error.defense}</p>
            <label>Speed:</label>
            <input value={input.speed} placeholder="Speed" name='speed'onChange={e => handleChange(e)}/>
            <p>{error.speed}</p>
            <label>Height:</label>
            <input value={input.height} placeholder="Height" name='height'onChange={e => handleChange(e)}/>
            <p>{error.height}</p>
            <label>Weight:</label>
            <input value={input.weight} placeholder="Weight" name='weight'onChange={e => handleChange(e)}/>
            <p>{error.weight}</p>
            <label>Image:</label>
            <input value={input.img} placeholder="Image" name='img'onChange={e => handleChange(e)}/>
            <p>{error.img}</p>
            <select onChange={e => handleSelect(e)}>
                <option>Select Type</option>
                { types?.map(t => {
                    return (
                        <option key={t.id} value={t.name}>{t.name}</option>
                    )
                })}
            </select>
            { input.types.map(t => {
                return (
                    <p key={t}>{t}<button onClick={() => handleDelete(t)}>x</button></p>
                )
            })}

           { input.name && input.hp && input.attack && input.defense && input.speed && input.height && input.weight && input.types.length && input.img ? 
             <button className="button_form" type="submit">Create!</button> : <p>You must fill all the form</p>
            }
        </form>
    )
}



/*  Nombre del proyecto: Online Nature
Descripcion del proyecto: Aplicacion interactiva destinada a donaciones para reservas naturales y adopcion de animales en peligro extincion

-Deploy ------->
-Auth -------> Auth0, JsonWebToken
-Pasarela de pagos -------> MercadoPago, Strippe
-Filtros -------> Pais, Especie, Habitat(region o ecosistema)
-Cloudinary/upload/bucket -------> Cloudinary
-Local Storage -------> Almacenar informacion del usuario, guardar token de autenticacion
-Review -------> Q&A, espacio para poner comentarios y preguntas
-Dashboard Admin -------> Llevar el control de donaciones, adopciones o compras
-Notificaciones(mail, socket.io) -------> Se generara un boletin que se mandara a los usuarios registrados sobre nuevos recursos en la pagina y el estatus de sus acciones en la pagina
-Borrado Logico(cambiado por geolocalizacion o graficos de rango) -------> se permitira a los usuarios geolocalizar las reservas naturales a las cuales donaran, se mostraran datos estadisticos con la finalidad de concientizar


Ideas Extras:


User Story: 
   -Yo como usuario me gustaria ver las donaciones cercanas a mi localidad
   -Yo como usuario me gustaria recibir notificaciones de cambios que se realicen en mi perfil, en la pagina o en el estatus de mis acciones
   -            */
