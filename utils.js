/**
 * Fetches data from a given API URL.
 * @param {string} url - The API URL to fetch data from.
 * @returns {Promise<Object|null>} - The response data or null on failure.
 */
export async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fehler beim Abrufen von ${url}`);
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Laden der Daten von URL:', url, error);
    return null;
  }
}

/**
 * Retrieves the image URL of a Pokémon.
 * @param {Object} pokemon - The Pokémon object containing sprite details.
 * @returns {string} - The image URL or a default placeholder.
 */
export function getPokemonImage(pokemon) {
   if (!pokemon?.details?.sprites) {
     console.error('Ungültiges Pokémon-Objekt:', pokemon);
     return 'img/pokeball-96.png';
   }
 
   return (
     pokemon.details.sprites.other.dream_world.front_default ||
     pokemon.details.sprites.other.home.front_default ||
     'img/pokedex2.png'
   );
 }
