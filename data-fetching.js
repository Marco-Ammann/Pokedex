/**
 * Fetches data from the specified URL and returns it as JSON.
 * Handles errors by logging them and returning null to allow calling code to handle failures gracefully.
 *
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise<Object|null>} The data as a JSON object, or null if an error occurs.
 */
async function fetchDataFromAPI(url) {
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error loading data from URL:', url, error);
      return null;
   }
}


/**
 * Loads Pokémon data from the PokeAPI and appends it to the pokemons array.
 * Manages the loading state and flags to prevent over-fetching.
 *
 * @param {number} limit - The number of Pokémon entries to fetch.
 * @param {number} offset - The offset from which to start fetching.
 */
async function loadPokemon(limit, offset) {
   isLoading = true;
   const url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
   const data = await fetchDataFromAPI(url);
   if (data) {
      pokemons = pokemons.concat(data.results);
      await Promise.all(data.results.map((pokemon) => loadPokemonDetails(pokemon.url)));
   }
   isLoading = false;
   isBottomReached = false;
}


/**
 * Fetches and stores detailed data for a specific Pokémon by its URL.
 * Updates the details for the Pokémon in the pokemons array.
 *
 * @param {string} url - The URL to fetch Pokémon details from.
 */
async function loadPokemonDetails(url) {
   const data = await fetchDataFromAPI(url);
   if (data) {
      const pokemonIndex = pokemons.findIndex((pokemon) => pokemon.url === url);
      pokemons[pokemonIndex].details = data;
      await loadPokemonSpecies(data.species.url, pokemonIndex);
   }
}


/**
 * Fetches and stores species information for a Pokémon.
 * Loads evolution chain data if available.
 *
 * @param {string} url - The URL to fetch Pokémon species information from.
 * @param {number} index - The index of the Pokémon in the pokemons array.
 */
async function loadPokemonSpecies(url, index) {
   const speciesData = await fetchDataFromAPI(url);
   if (speciesData) {
      pokemons[index].speciesDetails = speciesData;
      if (speciesData.evolution_chain) {
         await loadEvolutionChain(speciesData.evolution_chain.url, index);
      }
   }
}


/**
 * Fetches and stores the evolution chain for a specific Pokémon.
 *
 * @param {string} url - The URL to fetch the evolution chain data from.
 * @param {number} index - The index of the Pokémon in the pokemons array for which the evolution data is stored.
 */
async function loadEvolutionChain(url, index) {
   const evolutionData = await fetchDataFromAPI(url);
   if (evolutionData) {
      pokemons[index].evolutionChain = evolutionData;
   }
}


/**
 * Triggers the loading of the next batch of 30 Pokémon from the API.
 * Checks if loading is already in progress or the end of the page has not been reached to prevent duplicate fetches.
 */
function loadMorePokemon() {
   if (isLoading || !isBottomReached) return;
   loadPokemon(50, currentOffset);
   currentOffset += 50;
   renderCards();
   console.log(pokemons);
}


/**
 * Fetches and stores a Pokémon by its species URL if it's not already loaded into the evolution data array.
 * @param {string} speciesUrl - The URL to fetch Pokémon species data from.
 * @returns {Promise<void>}
 */
async function fetchAndStorePokemonIfMissing(speciesUrl) {
   const pokemonExists = pokemon_evolution.some(
      (pokemon) => pokemon.speciesDetails.url === speciesUrl
   );
   if (!pokemonExists) {
      const speciesData = await fetchDataFromAPI(speciesUrl);
      if (speciesData) {
         const pokemonData = await fetchDataFromAPI(
            `https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`
         );
         if (pokemonData) {
            const newPokemon = {
               name: pokemonData.name,
               url: `https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`,
               details: pokemonData,
               speciesDetails: speciesData,
            };
            pokemon_evolution.push(newPokemon);
         }
      }
   }
}
