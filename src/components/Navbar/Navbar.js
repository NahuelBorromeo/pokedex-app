import React, { useContext } from 'react'
import FavoriteContext from '../../contexts/favoritesContext'
import logo from '../../media/pokeapi.png'
import pokebola from '../../media/pokebola.png'
import './Navbar.css'

//Creamos el componente de Navbar que contiene el logo y un ícono de corazón.
export const Navbar = () => {
    
    const { favoritePokemons } = useContext(FavoriteContext)
    
    return (
        <nav>
            <div />
            <div>
                <img 
                src={logo} 
                alt="logo pokeapi"
                className="navbar-image"
                />                
            </div>
            <div><img src={pokebola} alt="pokeball icon"></img>{favoritePokemons.length}</div>
        </nav>
    )
}
