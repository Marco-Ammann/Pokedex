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
