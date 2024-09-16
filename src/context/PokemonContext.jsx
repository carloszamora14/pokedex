import { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();
const MAX_POKEMONS = 10000;

export const usePokemon = () => useContext(PokemonContext);

function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);

  const updatePokemons = newPokemons => {
    setPokemons(newPokemons);
    localStorage.setItem('pokemons', JSON.stringify(newPokemons));
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('pokemons');
      if (storedData) {
        setPokemons(JSON.parse(storedData));
      } else {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}`,
        );
        const data = await response.json();
        const pokemonNames = data.results.map(pokemon => ({
          name: pokemon.name,
        }));
        updatePokemons(pokemonNames);
      }
    };

    fetchData();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, updatePokemons }}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonProvider;
