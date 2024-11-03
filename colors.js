/**
 * Colors for different Pokémon types.
 * @type {Object<string, string>}
 */
export const typeColors = {
   grass: '#16C172',
   fire: '#EF271B',
   water: '#4361EE',
   electric: '#FFBF00',
   ice: '#90E0EF',
   poison: '#6E44FF',
   normal: '#C18CBA',
   fighting: '#C75000',
   ground: '#885629',
   flying: '#8B9CAD',
   psychic: '#DB00B6',
   bug: '#059669',
   rock: '#63320B',
   ghost: '#9A54A1',
   dark: '#434649',
   steel: '#73E2A7',
   fairy: '#EE4268',
   dragon: '#2EC4B6',
};

/**
 * Sets the background color of a given element based on Pokémon type.
 * @param {Object} pokemon - The Pokémon object containing type details.
 * @param {HTMLElement} element - The element to set the background color for.
 */
export function setBackgroundcolorFromType(pokemon, element) {
   const backgroundColor = getCardBackgroundColor(
      pokemon.details.types.map((type) => type.type.name.toLowerCase())
   );
   element.style.background = backgroundColor;
}

/**
 * Sets the background color for the overlay based on Pokémon type.
 * @param {Object} pokemon - The Pokémon object containing type details.
 */
export function setBackgroundcolorFromTypeforOverlay(pokemon) {
   const cardDetail = document.getElementById(`card-detail`);
   const backgroundColor = getCardBackgroundColor(
      pokemon.details.types.map((type) => type.type.name.toLowerCase())
   );
   cardDetail.style.background = backgroundColor;
}

/**
 * Returns the background color or gradient based on Pokémon types.
 * @param {string[]} types - Array of type names.
 * @returns {string} - Background color or gradient.
 */
function getCardBackgroundColor(types) {
   if (types.length === 1) {
      return typeColors[types[0]] || 'white';
   } else if (types.length === 2) {
      return `linear-gradient(to right, ${typeColors[types[0]] || 'white'}, ${
         typeColors[types[1]] || 'white'
      })`;
   } else {
      return 'white';
   }
}
