//definición del punto de acceso de la api y función asincrona
const BASE_URL = 'https://pokeapi.co/api/v2/';

        const fetchPokemon = async (pokemon) => {
            try {
                const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
                const parsedResponse = await response.json();
                return { id: parsedResponse.id, data: parsedResponse };
            } catch (err) {
                console.error(err);
            }
        }

        const renderPokemonCard = (pokemon) => {
            // Crea la tarjeta Pokemon con la información recibida
            const cardContainer = document.getElementById('pokemon-card');
            cardContainer.innerHTML = `
                <div>
                    <h2>${pokemon.data.name}</h2>
                    <img src="${pokemon.data.sprites.front_default}" alt="${pokemon.data.name}">
                    <p>Height: ${pokemon.data.height}</p>
                    <p>Weight: ${pokemon.data.weight}</p>
                    <!-- Puedes agregar más información según tus necesidades -->
                </div>
            `;
        };

        document.getElementById('get-btn').addEventListener('click', async () => {
            const text = document.getElementById('poke-name').value.toLowerCase();
            const { id, data } = await fetchPokemon(text);
            localStorage.setItem('currentPokeId', id);
            localStorage.setItem('currentPokeData', JSON.stringify(data));
            console.log(data.name);
            renderPokemonCard({ id, data }); // Renderiza la tarjeta Pokemon
        });

        document.addEventListener('DOMContentLoaded', async () => {
            const storedId = localStorage.getItem('currentPokeId');
            const storedData = JSON.parse(localStorage.getItem('currentPokeData'));
            const initialId = storedId ? parseInt(storedId) : 1;
            const pokemon = await fetchPokemon(initialId);
            console.log(pokemon.name);
            renderPokemonCard(pokemon); // Renderiza la tarjeta Pokemon al cargar la página
        });

        document.getElementById('previous-btn').addEventListener('click', async () => {
            const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
            const newId = Math.max(1, currentPokeId - 1);
            const pokemon = await fetchPokemon(newId);
            console.log(pokemon.name);
            renderPokemonCard(pokemon); // Renderiza la tarjeta Pokemon
        });

        document.getElementById('next-btn').addEventListener('click', async () => {
            const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
            const newId = currentPokeId + 1;
            const { data } = await fetchPokemon(newId);
            localStorage.setItem('currentPokeId', newId);
            localStorage.setItem('currentPokeData', JSON.stringify(data));
            console.log(data.name);
            renderPokemonCard({ id: newId, data }); // Renderiza la tarjeta Pokemon
        });

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'title1',
                body: 'Lorem ipsum dolor sit amet',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(res => res.json())
            .then(json => console.log(json))
/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
