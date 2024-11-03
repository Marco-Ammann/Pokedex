import { state } from './state.js';
import { loadPokemon } from './data-fetching.js';
import { renderCards } from './render.js';
import { POKEMON_LOAD_LIMIT } from './config.js';
import { setLoadingState } from './script.js';

let isFetching = false;

export function setupScrollListener() {
   window.addEventListener('scroll', throttleAsync(handleScroll, 200));
}


async function handleScroll() {
   const scrollPosition = window.innerHeight + window.scrollY;
   const threshold = document.documentElement.scrollHeight - 500;

   if (scrollPosition >= threshold && !isFetching) {
      isFetching = true;
      setLoadingState(true);

      const newDataLoaded = await loadMorePokemon();

      if (newDataLoaded) {
         renderCards();
         state.currentOffset += POKEMON_LOAD_LIMIT;
      } else {
         console.log('Keine weiteren Pokémon zum Laden.');
         window.removeEventListener('scroll', handleScroll);
      }

      setLoadingState(false);
      isFetching = false;
   }
}


export function loadMorePokemon() {
   return loadPokemon(POKEMON_LOAD_LIMIT, state.currentOffset);
}


function throttleAsync(func, limit) {
   let inThrottle;
   return async function (...args) {
      if (!inThrottle) {
         inThrottle = true;
         await func.apply(this, args);
         setTimeout(() => {
            inThrottle = false;
         }, limit);
      }
   };
}

