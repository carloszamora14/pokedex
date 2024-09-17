function parsePokemonData(pokemonData) {
  const newPokemonData = {};

  const flavorText = pokemonData.flavor_text_entries?.find(
    entry => entry.language.name === 'en',
  );
  if (flavorText) {
    newPokemonData.flavorText = flavorText.flavor_text.replace(/[\f\n]/g, ' ');
  }

  if (pokemonData.types?.length > 0) {
    newPokemonData.types = pokemonData.types
      .sort((a, b) => a.slot - b.slot)
      .map(typeInfo => typeInfo.type.name);
  }

  const statMapping = {
    hp: 'hp',
    attack: 'attack',
    defense: 'defense',
    'special-attack': 'specialAttack',
    'special-defense': 'specialDefense',
    speed: 'speed',
  };

  if (pokemonData.stats?.length > 0) {
    newPokemonData.stats = pokemonData.stats.reduce((acc, stat) => {
      const mappedName = statMapping[stat.stat.name];
      if (mappedName) {
        acc[mappedName] = stat.base_stat;
      }
      return acc;
    }, {});
  }

  ['name', 'id', 'weight', 'height'].forEach(prop => {
    if (pokemonData[prop] !== undefined) {
      newPokemonData[prop] = pokemonData[prop];
    }
  });

  const imageUrl =
    pokemonData.sprites?.other?.['official-artwork']?.front_default;
  if (imageUrl) {
    newPokemonData.image = imageUrl;
  }

  return newPokemonData;
}

export default parsePokemonData;
