// Array to store the names of caught Pokémon
var caughtPokemon = [];

// Function to display random Pokémon sprites in the Pokémon World section
async function displayPokemon() {
    var pokemonSection = document.getElementById('pokemon');
    pokemonSection.innerHTML = "";  // Clear previous Pokémon

    try {
        // Fetch 4 random Pokémon
        for (let i = 0; i < 4; i++) {
            let randomId = Math.floor(Math.random() * 905) + 1;  // 1st generation Pokémon IDs range from 1 to 151
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            let data = await response.json();

            var pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon';

            // Add Pokemon sprite
            var pokemonSprite = document.createElement('img');
            pokemonSprite.src = data.sprites.front_default;
            pokemonSprite.alt = data.name;
            pokemonSprite.style.width = '50px';
            pokemonSprite.style.height = '50px';
            pokemonDiv.appendChild(pokemonSprite);

            // Add click event to catch the Pokémon
            pokemonDiv.onclick = function() { catchPokemon(data.name); };
            
            // Append to the Pokémon World section
            pokemonSection.appendChild(pokemonDiv);
        }
    } catch (error) {
        console.error('There was a problem fetching the Pokémon data:', error);
    }
}

// Function to "catch" a clicked Pokémon
function catchPokemon(pokemonName) {
    if (!caughtPokemon.includes(pokemonName)) {
        caughtPokemon.push(pokemonName);
        updateCaughtList();
    }
}

// Function to update the list of caught Pokémon
function updateCaughtList() {
    var caughtList = document.getElementById('caught-list');
    caughtList.innerHTML = "";  // Clear previous list

    caughtPokemon.forEach(function(pokemonName) {
        var listItem = document.createElement('li');
        listItem.innerHTML = pokemonName;
        caughtList.appendChild(listItem);
    });
}

// Initialize the Pokémon display and caught list when the page loads
window.onload = function() {
    displayPokemon();
}
