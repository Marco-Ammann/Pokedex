import { state } from './state.js';
import { fetchDataFromAPI } from './utils.js';
import { setLoadingState, showError } from './script.js';

const BASE_URL = 'https://pokeapi.co/api/v2/';


export async function loadPokemon(limit, offset) {
   try {
      setLoadingState(true);
      const data = await fetchPokemonData(limit, offset);
      if (data) {
         await processPokemonData(data);
         return true;
      }
      return false;
   } catch (error) {
      console.error('Fehler beim Laden der Pokémon:', error);
      showError('Fehler beim Laden der Pokémon. Bitte versuche es später erneut.');
      return false;
   } finally {
      setLoadingState(false);
      state.isLoading = false;
      state.isBottomReached = false;
   }
}


async function fetchPokemonData(limit, offset) {
   const cachedData = localStorage.getItem(`pokemons_${offset}`);
   if (cachedData) {
      return JSON.parse(cachedData);
   }
   const url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
   const data = await fetchDataFromAPI(url);
   if (data && data.results.length > 0) {
      localStorage.setItem(`pokemons_${offset}`, JSON.stringify(data));
      return data;
   }
   return null;
}


async function processPokemonData(data) {
   await Promise.all(data.results.map((pokemon) => loadPokemonDetails(pokemon.url)));
   state.pokemons.sort((a, b) => a.details.id - b.details.id);
}


export async function loadPokemonDetails(url) {
   try {
      const data = await fetchDataFromAPI(url);
      if (data && !state.pokemons.some((pokemon) => pokemon.details.id === data.id)) {
         const pokemon = { details: data };
         state.pokemons.push(pokemon);
         await loadPokemonSpecies(data.species.url, data.id);
      }
   } catch (error) {
      console.error(`Fehler beim Laden der Pokémon-Details von ${url}:`, error);
   }
}


export async function loadPokemonSpecies(url, pokemonId) {
   try {
      const speciesData = await fetchDataFromAPI(url);
      if (speciesData) {
         const pokemon = state.pokemons.find((p) => p.details.id === pokemonId);
         if (pokemon) {
            pokemon.speciesDetails = speciesData;
            if (speciesData.evolution_chain) {
               await loadEvolutionChain(speciesData.evolution_chain.url, pokemonId);
            }
         } else {
            console.error(`Pokémon mit ID ${pokemonId} nicht in state.pokemons gefunden.`);
         }
      }
   } catch (error) {
      console.error(`Fehler beim Laden der Pokémon-Spezies von ${url}:`, error);
   }
}


export async function loadEvolutionChain(url, pokemonId) {
   try {
      const evolutionData = await fetchDataFromAPI(url);
      if (evolutionData) {
         const pokemon = state.pokemons.find((p) => p.details.id === pokemonId);
         if (pokemon) {
            pokemon.evolutionChain = evolutionData;
         } else {
            console.error(`Pokémon mit ID ${pokemonId} nicht in state.pokemons gefunden.`);
         }
      }
   } catch (error) {
      console.error(`Fehler beim Laden der Evolutionskette von ${url}:`, error);
   }
}
