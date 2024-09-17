function getPokemonFallbackImage(pokemonId) {
  const formattedId = String(pokemonId).padStart(3, '0');
  const fallbackBaseUrl =
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full';

  return `${fallbackBaseUrl}/${formattedId}.png`;
}

export default getPokemonFallbackImage;
