// Function to display random Pokémon sprites on the screen using API
async function displayPokemon() {
    var pokemonSection = document.getElementById('pokemon');
    pokemonSection.innerHTML = "";  // Clear previous Pokémon

    try {
        // Fetch 4 random Pokémon (you can change the number as needed)
        for (let i = 0; i < 4; i++) {
            let randomId = Math.floor(Math.random() * 151) + 1;  // 1st generation Pokémon IDs range from 1 to 151
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            let data = await response.json();

            var pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon';

            // Add Pokemon name
            var pokemonName = document.createElement('p');
            pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);  // Capitalize the first letter
            pokemonDiv.appendChild(pokemonName);

            // Add Pokemon sprite
            var pokemonSprite = document.createElement('img');
            pokemonSprite.src = data.sprites.front_default;
            pokemonSprite.alt = data.name;
            pokemonDiv.appendChild(pokemonSprite);

            pokemonDiv.onclick = function() { catchPokemon(data.name); };
            pokemonSection.appendChild(pokemonDiv);
        }
    } catch (error) {
        console.error('There was a problem fetching the Pokémon data:', error);
    }
}
