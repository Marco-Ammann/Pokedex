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


export function setBackgroundcolorFromType(pokemon, element) {
   const backgroundColor = getCardBackgroundColor(
      pokemon.details.types.map((type) => type.type.name.toLowerCase())
   );
   element.style.background = backgroundColor;
}


export function setBackgroundcolorFromTypeforOverlay(pokemon) {
   const cardDetail = document.getElementById(`card-detail`);
   const backgroundColor = getCardBackgroundColor(
      pokemon.details.types.map((type) => type.type.name.toLowerCase())
   );
   cardDetail.style.background = backgroundColor;
}


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
