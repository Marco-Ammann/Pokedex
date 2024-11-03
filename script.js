const BASE_URL = 'https://pokeapi.co/api/v2/';
let pokemons = [];
let pokemon_evolution = [];
let currentOffset = 0;
let isLoading = false;
let isBottomReached = false;

/**
 * Initialises the page, loads the first 50 pokemon and sets up a scroll-listener
 */
async function init() {
   setupScrollListener();
   await loadPokemon(50, 0);
   currentOffset = 50;
   renderCards();
}

/**
 * Sets up a scroll listener, to watch the scrollbar to reach the end
 */
function setupScrollListener() {
   window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
         isBottomReached = true;
      }
      loadMorePokemon();
   });
}

/**
 * Renders cards for all Pokémon and adds them to the DOM. This function first
 * generates HTML for each Pokémon card and then applies the appropriate background
 * colors based on the Pokémon's types.
 */
async function renderCards() {
   let cardContainer = document.getElementById('pokemonCards');
   let cardsHTML = '';

   pokemons.forEach((pokemon) => {
      cardsHTML += generatePokemonCardHTML(pokemon);
   });

   cardContainer.innerHTML = cardsHTML;

   pokemons.forEach((pokemon) => {
      setBackgroundcolorFromType(pokemon);
   });
}
