/**
 * Represents the application state.
 * @type {Object}
 * @property {Array<Object>} pokemons - Array of Pokémon objects in the state.
 * @property {Array<Object>} pokemon_evolution - Array of evolution data for Pokémon.
 * @property {number} currentOffset - Current offset for data loading.
 * @property {boolean} isLoading - Indicates if data is being loaded.
 * @property {boolean} isBottomReached - Indicates if the bottom of the page has been reached.
 * @property {Set<number>} renderedPokemonIds - Set of Pokémon IDs already rendered.
 */
export const state = {
   pokemons: [],
   pokemon_evolution: [],
   currentOffset: 0,
   isLoading: false,
   isBottomReached: false,
   renderedPokemonIds: new Set(),
};
