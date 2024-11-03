import { state } from './state.js';
import { loadPokemon } from './data-fetching.js';
import { renderCards } from './render.js';
import { setupScrollListener } from './scroll.js';
import { filterPokemons } from './search.js';
import { loadMorePokemon } from './scroll.js';
import { POKEMON_LOAD_LIMIT } from './config.js';
import { openCardDetail, closeCardDetail } from './navigation.js';

/**
 * Toggles the display of a loading spinner.
 * @param {boolean} isLoading - True to show the loading spinner, false to hide.
 */
export function setLoadingState(isLoading) {
   const loadingSpinner = document.getElementById('loading');
   loadingSpinner.style.display = isLoading ? 'flex' : 'none';
}

/**
 * Displays an error message.
 * @param {string} message - The message to display.
 */
export function showError(message) {
   const errorDiv = document.getElementById('error-message');
   errorDiv.textContent = message;
   errorDiv.style.display = 'block';
}

/**
 * Hides the error message.
 */
export function hideError() {
   document.getElementById('error-message').style.display = 'none';
}

/**
 * Sets up event listeners for the search input and load more button.
 */
function setupEventListeners() {
   document.getElementById('pokemonSearch').addEventListener('input', filterPokemons);

   document.querySelector('.loadmore').addEventListener('click', async () => {
      const loadMoreButton = document.querySelector('.loadmore');
      loadMoreButton.disabled = true;
      setLoadingState(true);

      const newDataLoaded = await loadMorePokemon();

      if (newDataLoaded) {
         renderCards();
         state.currentOffset += POKEMON_LOAD_LIMIT;
      } else {
         console.log('Keine weiteren Pokémon zum Laden.');
      }

      setLoadingState(false);
      loadMoreButton.disabled = false;
   });

   document.getElementById('pokemonCards').addEventListener('click', (event) => {
      const card = event.target.closest('.pokemon-card');
      if (card) {
         openCardDetail(card.getAttribute('data-pokemon-id'));
      }
   });

   document.getElementById('overlay').addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
         closeCardDetail();
      }
   });
}

/**
 * Initializes the application and sets up event listeners.
 */
async function init() {
   setupEventListeners();
   setupScrollListener();

   await loadAndRenderInitialPokemons();

   preloadNextPokemons();
}

/**
 * Loads and renders the initial batch of Pokémon.
 */
async function loadAndRenderInitialPokemons() {
   const batchSize = 5;
   const totalInitialPokemons = 50;
   const totalBatches = totalInitialPokemons / batchSize;

   for (let i = 0; i < totalBatches; i++) {
      const offset = i * batchSize;
      const newDataLoaded = await loadPokemon(batchSize, offset);
      if (newDataLoaded) {
         renderCards();
         state.currentOffset += batchSize;
      } else {
         console.log('Keine Pokémon zum Laden.');
         break;
      }
   }
}

/**
 * Preloads the next batch of Pokémon.
 */
function preloadNextPokemons() {
   const nextOffset = state.currentOffset;
   loadPokemon(POKEMON_LOAD_LIMIT, nextOffset);
}


init();
