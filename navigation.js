/**
 * Navigates to the previous or next Pokémon in the overlay.
 * @param {string} direction - 'prev' for previous Pokémon, 'next' for next Pokémon.
 */
function navigatePokemon(direction) {
    const currentIndex = pokemons.findIndex((pokemon) => pokemon.details.id.toString() === document.getElementById('pokemonDetailCard').getAttribute('data-pokemon-id'));

    if (currentIndex !== -1) {
        let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0) {
            newIndex = pokemons.length - 1;
        } else if (newIndex >= pokemons.length) {
            newIndex = 0;
        }

        openCardDetail(pokemons[newIndex].details.id.toString());
    }
}


/**
 * Handles navigation clicks in the Pokémon detail view.
 * @param {string} contentType - The type of content to display (e.g., 'About', 'Base Stats', 'Moves', 'Evolution').
 */
async function changeContent(contentType, pokemonId) {
    const navItems = document.querySelectorAll('.detail_content nav p');
    const resultContainer = document.querySelector('.nav_result');

    navItems.forEach(item => {
        if (item.textContent === contentType) {
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
            break;
        case 'Moves':
            resultContainer.innerHTML = generateMovesContent(pokemonId);
            break;
        case 'Evolution':
            resultContainer.innerHTML = await generateEvolutionContent(pokemonId);
            break;
    }
}

