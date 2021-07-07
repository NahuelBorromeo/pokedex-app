
//Función async que hace la petición http, 
export const searchPokemon = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch (url)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('El pokemon no existe')
    }
}


//Función que retorna un objeto con la propiedad results que esta incluye los datos (name y url) de 10 pokemons
export const getPokemons = async (limit=10, offset=0) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch (url)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
};


//Función que toma la url de un pokemon y retorna sus datos, incluyendo peso, imagen, nombre, etc.
export const getPokemonData = async (url) => {
    try {
        const response = await fetch (url)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}