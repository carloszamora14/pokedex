import { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import Card from './Card';
import parsePokemonData from '../utils/parsePokemonData';

const POKEMONS_PER_PAGE = 20;

function PokemonList() {
  const [page, setPage] = useState(1);
  const { pokemons, updatePokemons } = usePokemon();

  const startIndex = (page - 1) * POKEMONS_PER_PAGE;
  const endIndex = Math.min(page * POKEMONS_PER_PAGE, pokemons.length);

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchPromises = [];


      for (let i = startIndex; i < endIndex; i++) {
        const pokemon = pokemons[i];

        if (
          !pokemon.image ||
          !pokemon.types ||
          !pokemon.stats ||
          !pokemon.weight ||
          !pokemon.height ||
          !pokemon.id
        ) {
          console.log(pokemon.name);
          fetchPromises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error fetching ${pokemon.name}`);
                }
                return response.json();
              })
              .then(data => parsePokemonData(data))
              .catch(error => {
                console.error('Failed to fetch Pokémon data:', error);
                return null;
              }),
          );
        }
      }

      const newPokemons = await Promise.all(fetchPromises);

      if (newPokemons.length > 0) {
        const updatedPokemons = pokemons.map(pokemon => {
          const newPokemonData = newPokemons.find(
            np => np && np.name === pokemon.name,
          );
          return newPokemonData ? { ...pokemon, ...newPokemonData } : pokemon;
        });

        updatePokemons(updatedPokemons);
      }
    };

    if (pokemons && pokemons.length > 0) {
      fetchPokemons();
    }
  }, [page, pokemons, updatePokemons]);

  return (
    pokemons && (
      <>
        <button
          onClick={() => {
            page > 1 && setPage(page - 1);
          }}
        >
          Previous page
        </button>
        <button onClick={() => setPage(page + 1)}>Next page</button>
        {pokemons.slice(startIndex, endIndex).map(pokemon => (
          <Card
            key={pokemon.name}
            image={pokemon.image}
            name={pokemon.name}
            id={pokemon.id}
            types={pokemon.types}
          />
        ))}
      </>
    )
  );
}

export default PokemonList;
