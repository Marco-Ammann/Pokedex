import { state } from './state.js';
import { getPokemonImage } from './utils.js';
import { fetchDataFromAPI } from './utils.js';


export function generatePokemonCardHTML(pokemon) {
   return `
    <div
      class="pokemon-card"
      id="card-${pokemon.details.id}"
      data-pokemon-id="${pokemon.details.id}"
    >
      <div class="pokemon-card__type">
        ${pokemon.details.types.map((type) => type.type.name.toUpperCase()).join(', ')}
      </div>
      <img
        class="pokemon-card__img"
        src="${getPokemonImage(pokemon)}"
        alt="${pokemon.details.name} sprite"
        loading="lazy"
      />
      <div class="pokemon-card__info">
        <div class="pokemon-card__number">#${pokemon.details.id}</div>
        <div class="pokemon-card__name">${pokemon.details.name.toUpperCase()}</div>
      </div>
    </div>
  `;
}


export function generateOpenedPokemonCardHTML(pokemon) {
   const aboutContent = generateAboutContent(pokemon.details.id.toString());

   return `
    <div class="pokemonDetailCard" id="pokemonDetailCard" data-pokemon-id="${pokemon.details.id}">
      <div class="openCard_span_div">
        <div class="openCard_number">#${pokemon.details.id}</div>
        <div class="openCard_name">${pokemon.details.name.toUpperCase()}</div>
        <div id="closeButton" class="close">X</div>
      </div>

      <div class="openCard_details">
        <img
          class="detail_img"
          src="${getPokemonImage(pokemon)}"
          loading="lazy"
          alt="${pokemon.details.name} sprite"
        />

        <div class="detail_content">
          <nav>
            <p class="active" data-content-type="About">About</p>
            <p data-content-type="Base Stats">Base Stats</p>
            <p data-content-type="Moves">Moves</p>
            <p data-content-type="Evolution">Evolution</p>
          </nav>

          <div class="nav_result">
            ${aboutContent}
          </div>
        </div>
      </div>
    </div>
  `;
}


export function generateAboutContent(pokemonId) {
   const pokemon = state.pokemons.find((p) => p.details.id === Number(pokemonId));
   if (!pokemon) return '<div>Pokémon nicht gefunden.</div>';

   const types = pokemon.details.types
      ? pokemon.details.types.map((type) => type.type.name).join(', ')
      : 'Unbekannt';
   const abilities = pokemon.details.abilities
      ? pokemon.details.abilities.map((ability) => ability.ability.name).join(', ')
      : 'Unbekannt';

   return `
    <div class="nav_row">
      <h2>Typen:</h2>
      <div>${types}</div>
    </div>
    <div class="nav_row">
      <h2>Art:</h2>
      <span>${pokemon.speciesDetails.genera[7]?.genus || 'Unbekannt'}</span>
    </div>
    <div class="nav_row">
      <h2>Größe:</h2>
      <span>${pokemon.details.height / 10} m</span>
    </div>
    <div class="nav_row">
      <h2>Gewicht:</h2>
      <span>${pokemon.details.weight / 10} kg</span>
    </div>
    <div class="nav_row">
      <h2>Fähigkeiten:</h2>
      <span>${abilities}</span>
    </div>
  `;
}


export function generateMovesContent(pokemonId) {
   const pokemon = state.pokemons.find((p) => p.details.id === Number(pokemonId));
   if (!pokemon || !pokemon.details.moves) {
      return '<div>Keine Moves für dieses Pokémon verfügbar.</div>';
   }

   const movesHtml = pokemon.details.moves
      .map((moveEntry) => `<p class="move">- ${moveEntry.move.name}</p>`)
      .join('');
   return `
    <div class="moves-div">
      <h2>Moves:</h2>
      <div class="moves">${movesHtml}</div>
    </div>
  `;
}


async function traverseEvolutionChain(chainNode) {
   if (!chainNode) return;

   await fetchAndStorePokemonIfMissing(chainNode.species.url);

   for (const nextChainNode of chainNode.evolves_to) {
      await traverseEvolutionChain(nextChainNode);
   }
}


export async function generateEvolutionContent(pokemonId) {
   const pokemon = state.pokemons.find((p) => p.details.id === Number(pokemonId));
   if (!pokemon || !pokemon.evolutionChain) {
      return '<div>Keine Evolutionsdaten verfügbar.</div>';
   }

   const chain = pokemon.evolutionChain.chain;
   await traverseEvolutionChain(chain);
   return renderEvolutionChain(chain);
}


function renderEvolutionChain(chain) {
   let htmlContent = '<div class="pokemon_evolution_div">';
   htmlContent += getEvolutionHTML(chain);
   htmlContent += '</div>';
   return htmlContent;
}


function getEvolutionHTML(chainNode) {
   if (!chainNode) return '';

   const speciesName = chainNode.species.name;
   const speciesId = chainNode.species.url.split('/').filter(Boolean).pop();
   const pokemon = findPokemonById(speciesId);
   const imageUrl = pokemon ? getPokemonImage(pokemon) : 'img/pokedex2.png';

   let html = `
    <div class="evolution-stage">
      <img class="pokemon_evolution_image" loading="lazy" src="${imageUrl}" alt="${speciesName}">
      <p>${speciesName}</p>
    </div>
  `;

   if (chainNode.evolves_to.length > 0) {
      html += '<img class="arrow" loading="lazy" src="img/long-arrow-right-icon.svg" alt="">';
      chainNode.evolves_to.forEach((nextChainNode) => {
         html += getEvolutionHTML(nextChainNode);
      });
   }

   return html;
}


function findPokemonById(pokemonId) {
   return (
      state.pokemons.find((p) => p.details.id === Number(pokemonId)) ||
      state.pokemon_evolution.find((p) => p.details.id === Number(pokemonId))
   );
}


async function fetchAndStorePokemonIfMissing(speciesUrl) {
   const speciesData = await fetchDataFromAPI(speciesUrl);
   if (speciesData) {
      const pokemonId = speciesData.id;
      if (!state.pokemons.some((p) => p.details.id === pokemonId)) {
         const pokemonData = await fetchDataFromAPI(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
         );
         if (pokemonData) {
            state.pokemon_evolution.push({
               details: pokemonData,
               speciesDetails: speciesData,
            });
         }
      }
   }
}
