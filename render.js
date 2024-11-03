import { state } from './state.js';
import { generatePokemonCardHTML } from './templates.js';
import { setBackgroundcolorFromType } from './colors.js';

/**
 * Renders Pokémon cards in the main container.
 */
export function renderCards() {
   const cardContainer = document.getElementById('pokemonCards');
 
   const sortedPokemons = state.pokemons.sort((a, b) => a.details.id - b.details.id);
 
   const fragment = document.createDocumentFragment();
 
   sortedPokemons.forEach((pokemon) => {
     if (!state.renderedPokemonIds.has(pokemon.details.id)) {
       const tempDiv = document.createElement('div');
       tempDiv.innerHTML = generatePokemonCardHTML(pokemon);
       const cardElement = tempDiv.firstElementChild;
       fragment.appendChild(cardElement);
 
       setBackgroundcolorFromType(pokemon, cardElement);
 
       state.renderedPokemonIds.add(pokemon.details.id);
     }
   });
 
   cardContainer.appendChild(fragment);
 }
