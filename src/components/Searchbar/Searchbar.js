import React, { useState } from 'react';
import { searchPokemon } from '../../api';

import './Searchbar.css';

//Creamos el componente Searchbar el cual tendrá el input para buscar el pokemon que nosotros queremos
export const Searchbar = ({onSearch}) => {
    
    //Declaramos el estado del search el cuál nos servira para capturar el evento onChange del input
    const [search, setSearch] = useState('');

    //Capturamos el evento onChange del input, para almacenar lo que se ingrese por teclado en nuestra variable de estado
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length === 0) {
            onSearch(null);
        }
    }

    //Capturamos el evento clic de nuestro botón, para hacer la búsqueda mediante una función async y una petición http pasandole el valor del search.
    const handleClick = async (e) => {
        e.preventDefault();
        onSearch(search.trim().toLowerCase())
    }


    return (
        <div className="searchbar-container">
            <form className="searchbar" onSubmit={ handleClick }>
                <input 
                    placeholder="Buscar pokemon..."
                    onChange={ handleChange }
                />
            </form>
            <div className="searchbar-btn">
                <button
                    onClick={ handleClick }
                >Buscar</button>
            </div>
        </div>
    )
}
