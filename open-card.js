/**
 * Opens the overlay
 */
function openCardDetail(pokemonId) {
   const overlay = document.getElementById('overlay');
   const cardDetail = document.getElementById('card-detail');
   const pokemon = pokemons.find((pokemon) => pokemon.details.id.toString() === pokemonId);

   if (pokemon) {
      cardDetail.innerHTML = generateOpenedPokemonCardHTML(pokemon);
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      changeContent('About', pokemonId);
      setBackgroundcolorFromTypeforOverlay(pokemon);
   }
}

/**
 * Closes the overlay
 */
function closeCardDetail() {
   const overlay = document.getElementById('overlay');
   overlay.style.display = 'none';
   document.body.style.overflow = 'auto';

   const cardDetail = document.getElementById('card-detail');
   cardDetail.innerHTML = '';}

document.getElementById('overlay').addEventListener('click', function (event) {
   if (event.target === this) {
      closeCardDetail();
   }
});
