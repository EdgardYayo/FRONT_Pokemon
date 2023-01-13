import React, { useEffect, useState } from "react";
import { filterByType, filterByName, orderName, orderByAttack, getTypes, filterByCreated } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './Nav.css';


export default function Nav({setCurrentPage, setOrder}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const allTypes = useSelector(state => state.types)
    //const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const handleFilterTypes = (e) => {
            dispatch(filterByType(e.target.value))
            setCurrentPage(1)
        
    }

    const handleOrderName = (e) => {
        e.preventDefault()
        dispatch(orderName(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }

    const handleOrderAttack = (e) => {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(filterByName(name))
        setName('');
        setCurrentPage(1)
    }

    const handleFilterName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleFilterCreated = (e) => {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1)
    }

    return (
        <nav className="navnav">
            <form onSubmit={e => handleSubmit(e)}>
                <input onChange={(e) => handleFilterName(e)} type="text" placeholder="Pokemon Name" value={name} />
                <button type="submit">Buscar</button>
            </form>
            <select onChange={e => handleFilterTypes(e)}>
                <option value='All'>All</option>
                {allTypes?.map(t => {
                    return (
                        <option key={t.id} value={t.name}>{t.name.toUpperCase()}</option>
                    )
                })}
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value='all'>All</option>
                <option value='created'>Created</option>
                <option value= 'api'>Api</option>
            </select>
            <select onChange={e => handleOrderName(e)}>
                <option value='normal'>Alphabetically</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={e => handleOrderAttack(e)}>
                <option value='normal'>Order By Attack</option>
                <option value='asc'>++</option>
                <option value='desc'>--</option>
            </select>
        </nav>
    )
}