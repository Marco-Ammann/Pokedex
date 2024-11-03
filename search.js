export function filterPokemons() {
   const input = document.getElementById('pokemonSearch').value.toUpperCase();
   const pokemonCards = document.querySelectorAll('.pokemon-card');
   const noResultsCard = document.querySelector('.no-results');
   let found = false;

   noResultsCard.style.display = 'none';

   pokemonCards.forEach((card) => {
      if (!card.classList.contains('no-results')) {
         const pokemonName = card.querySelector('.pokemon-card__name').textContent.toUpperCase();
         if (pokemonName.indexOf(input) > -1) {
            card.style.display = '';
            found = true;
         } else {
            card.style.display = 'none';
         }
      }
   });

   if (!found && input.trim().length > 0) {
      noResultsCard.style.display = '';
   }
}
