import { state } from './state.js';
import {
   generateAboutContent,
   generateOpenedPokemonCardHTML,
   generateMovesContent,
   generateEvolutionContent,
} from './templates.js';
import { initializeChart, generateBaseStatsContent } from './base_stats.js';
import { setBackgroundcolorFromTypeforOverlay } from './colors.js';

/**
 * Opens and displays detailed information for a specific Pokémon.
 * @param {number|string} pokemonId - ID of the Pokémon to display.
 */
export function openCardDetail(pokemonId) {
   const pokemon = state.pokemons.find((p) => p.details.id === Number(pokemonId));
   if (pokemon) {
      initializeOverlayContent(pokemon);
      setupEventListeners(pokemonId);
      document.getElementById('overlay').style.display = 'flex';
      document.body.style.overflow = 'hidden';
   }
}

/**
 * Initializes the content of the overlay for a specific Pokémon.
 * @param {Object} pokemon - The Pokémon object to display.
 */
function initializeOverlayContent(pokemon) {
   const cardDetail = document.getElementById('card-detail');
   cardDetail.innerHTML = generateOpenedPokemonCardHTML(pokemon);
   setBackgroundcolorFromTypeforOverlay(pokemon);
   changeContent('About', pokemon.details.id);
}

/**
 * Sets up event listeners for navigation buttons and tabs.
 * @param {number|string} pokemonId - ID of the Pokémon for navigation.
 */
function setupEventListeners(pokemonId) {
   document.getElementById('prevButton').onclick = () => navigatePokemon('prev');
   document.getElementById('nextButton').onclick = () => navigatePokemon('next');
   document.getElementById('closeButton').onclick = closeCardDetail;

   const navItems = document.querySelectorAll('.detail_content nav p');
   navItems.forEach((item) => {
      item.addEventListener('click', () => {
         const contentType = item.getAttribute('data-content-type');
         changeContent(contentType, pokemonId);
      });
   });
}

/**
 * Closes the detail overlay.
 */
export function closeCardDetail() {
   const overlay = document.getElementById('overlay');
   overlay.style.display = 'none';
   document.body.style.overflow = 'auto';
   const cardDetail = document.getElementById('card-detail');
   cardDetail.innerHTML = '';
}

/**
 * Changes the content displayed in the Pokémon detail overlay.
 * @param {string} contentType - The type of content to display.
 * @param {number|string} pokemonId - ID of the Pokémon to update content for.
 */
export async function changeContent(contentType, pokemonId) {
   const pokemon = state.pokemons.find((p) => p.details.id === Number(pokemonId));
   if (!pokemon) {
      console.error('Pokémon nicht gefunden!');
      return;
   }

   const navItems = document.querySelectorAll('.detail_content nav p');
   const resultContainer = document.querySelector('.nav_result');

   navItems.forEach((item) => {
      if (item.getAttribute('data-content-type') === contentType) {
         item.classList.add('active');
      } else {
         item.classList.remove('active');
      }
   });

   switch (contentType) {
      case 'About':
         resultContainer.innerHTML = generateAboutContent(pokemonId);
         break;
      case 'Base Stats':
         resultContainer.innerHTML = generateBaseStatsContent(pokemonId);
         initializeChart(pokemonId);
         break;
      case 'Moves':
         resultContainer.innerHTML = generateMovesContent(pokemonId);
         break;
      case 'Evolution':
         resultContainer.innerHTML = await generateEvolutionContent(pokemonId);
         break;
      default:
         resultContainer.innerHTML = '<div>Inhalt nicht verfügbar.</div>';
   }
}

/**
 * Navigates to the previous or next Pokémon.
 * @param {string} direction - 'prev' or 'next' to navigate Pokémon.
 */
export function navigatePokemon(direction) {
   const pokemonsArray = Array.from(state.pokemons.values());
   const currentPokemonId = Number(
      document.getElementById('pokemonDetailCard').getAttribute('data-pokemon-id')
   );
   const currentIndex = pokemonsArray.findIndex(
      (pokemon) => pokemon.details.id === currentPokemonId
   );

   if (currentIndex !== -1) {
      let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0) {
         newIndex = pokemonsArray.length - 1;
      } else if (newIndex >= pokemonsArray.length) {
         newIndex = 0;
      }

      openCardDetail(pokemonsArray[newIndex].details.id.toString());
   }
}
