import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Pokedex } from './components/Pokedex/Pokedex';
import { Searchbar } from './components/Searchbar/Searchbar';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from './contexts/favoritesContext';

import 'normalize.css';
import './App.css';

const localStorageKey = "favorite_pokemon";

function App() {

  //Creamos el estado de Pokemones para pasarselo como props a nuestro componente de Pokedex donde se mostraran en forma de lista grid.
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);

  //fetchPokemons devuelve un arreglo con los datos de los 10 primeros pokemons.
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      //si estamos en la página 0, nuestro offset sería 0*25 = 0, si estamos en la 1, sería 25.
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map( async(pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch(error){
      console.log(error);
    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }
  
  useEffect( () => {
    loadFavoritePokemons();
  }, [])

//Cada vez que el valor de la página(page) cambie, vamos a hacer las peticiones http de nuevo.
  useEffect( () => {
    fetchPokemons();
  },[page]);

  const updateFavoritePokemon = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name);
    if( isFavorite >= 0 ){
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name)
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, 
      JSON.stringify(updated));
  }

  const onSearch = async(pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
      setLoading(false);
      return
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(0);
    }
    setLoading(false);
  }

  return (
    <FavoriteProvider 
      value={
        { favoritePokemons: favorites,
          updateFavoritePokemon: updateFavoritePokemon }
      }>
          <Navbar />
          <Searchbar onSearch={onSearch}/>
          {notFound ?
          
          <div className="not-found-text">No se encontró el pokemon que buscabas 😔👌</div>
                    :

          <Pokedex 
            loading={ loading }
            pokemons={ pokemons }
            page={ page }
            setPage={ setPage }
            total={ total }
          />
          }
    </FavoriteProvider>
  );
}

export default App;
