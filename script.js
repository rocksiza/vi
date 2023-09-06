document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    fetchRandomPokemon();

    document.addEventListener('click', event => {
        console.log("Something clicked");

        let targetElement = event.target;
        if (targetElement.tagName === 'IMG') {
            targetElement = targetElement.parentElement;
        }

        if (targetElement.classList.contains('pokemon')) {
            console.log("Pokemon clicked");
            const pokemonId = targetElement.dataset.id;
            fetchPokedexEntry(pokemonId);
        } else {
            console.log("Non-Pokemon clicked");
            document.getElementById('pokedex-section').style.display = 'none';
        }
    });
});


async function fetchRandomPokemon() {
    console.log("Fetching random Pokemon");
    const pokemonContainer = document.getElementById('pokemon');
    
    for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;
        const response = await fetch(url);
        const data = await response.json();

        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon';
        pokemonDiv.dataset.id = randomId;

        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;

        pokemonDiv.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonDiv);

        console.log(`Added Pokemon: ${randomId}`);
    }
}

async function fetchPokedexEntry(pokemonId) {
    console.log("Fetching Pokédex entry...");
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    const response = await fetch(url);
    const data = await response.json();
    let pokedexText = data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

    // Standardize the text formatting
    pokedexText = pokedexText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    const pokedexSection = document.getElementById('pokedex-section');
    const pokedexImage = document.getElementById('pokedex-entry');
    const pokedexTextElement = document.getElementById('pokedex-text');

    pokedexImage.src = 'https://www.nicepng.com/png/full/240-2406318_pokemon-text-box-pokmon.png';
    pokedexTextElement.innerText = pokedexText;
    
    console.log("Showing Pokédex.");
    pokedexSection.style.display = 'flex';
}
