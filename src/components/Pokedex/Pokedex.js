import React from 'react';
import { Pagination } from './Pagination';
import { Pokemon } from './Pokemon';

import './Pokedex.css';

export const Pokedex = ( { loading, pokemons, page, setPage, total } ) => {

    const lastPage = () => {
        const lastPage = Math.max(page - 1, 0);
        setPage(lastPage)
    }

    const nextPage = () => {
        const nextPage = Math.min(page + 1 , total);
        setPage(nextPage)
    }

    return (
        <div>
            <div className="header">
                <h1>Pokedex</h1>
                <Pagination 
                    page={ page }
                    totalPages={total}
                    onLeftClick={lastPage}
                    onRightClick={nextPage}
                />
            </div>

            {loading ? 
                <>
                    <div>
                    <span className="loader-text">Cargando</span>
                    </div>
                    <div className="loader-animation">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div> 
                </>
                :
                    <div className="pokedex-grid">
                        {
                            pokemons.map( ( pokemon ) => {
                                return (
                                    <Pokemon 
                                        pokemon={pokemon}
                                        key={pokemon.name}
                                    />
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}
