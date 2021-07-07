import React, { useContext } from 'react'
import FavoriteContext from '../../contexts/favoritesContext';
import pokeball from '../../media/pokebola.png';
import pokeballwhite from '../../media/pokebolawhite.png';

export const Pokemon = ( { pokemon } ) => {
    
    const { favoritePokemons, updateFavoritePokemon } = useContext(FavoriteContext);

    const heart = favoritePokemons.includes(pokemon.name) ? pokeball : pokeballwhite;

    const clickHeart = (e) => {
        e.preventDefault();
        updateFavoritePokemon(pokemon.name);
    }

    return (
        <div className="pokemon-card">    
            <div className="pokemon-img-container">
                <img 
                    src={ pokemon.sprites.front_default } 
                    alt={ pokemon.name }
                    className="pokemon-img"
                />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3>{ pokemon.name }</h3>
                    <div>#{ pokemon.id }</div>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type">
                        {pokemon.types.map( (type, idx) => {
                            return (
                                <div key={idx} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button onClick={clickHeart}>
                        <div className="pokemon-favorite"><img src={heart} alt="pokeball icon"></img></div>
                    </button>
                </div>
            </div>        
        </div>
    )
}
