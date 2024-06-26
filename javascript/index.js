import { RickAndMortyAPI } from "./RickAndMortyAPI.js"; // Realiza la peticion a la API
import { CharacterList } from "./CharacterList.js"; // Crea la lista de personajes

document.addEventListener("DOMContentLoaded", async () => {
  const charactersContainer = document.getElementById("characters"); // Contenedor de personajes
  const characterTemplate =
    document.getElementById("character-template").content; // Plantilla de personaje
  const searchInput = document.getElementById('search');// Input de busqueda
  const prevButton = document.getElementById('prev');// Boton de pagina anterior
  const nextButton = document.getElementById('next');// Boton de pagina siguiente
  const api = new RickAndMortyAPI(); // Instancia de la clase RickAndMortyAPI
  const characterList = new CharacterList(); // Instancia de la clase CharacterList
  let URL = api.baseURL + '/character'; // URL de la API
  let nextPage = null;
  let prevPage = null;


  const fetchCharacters = async (url) => {
    try {
      const data = await api.getCharacters(url);
      characterList.setCharacters(data.results);
      displayCharacters(characterList.characters);
      nextPage = data.info.next;
      prevPage = data.info.prev;
      prevButton.disabled = !prevPage;
      nextButton.disabled = !nextPage;
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  // Muestra los personajes en el DOM
  const displayCharacters = (characters) => {
    document.startViewTransition(() => {
      charactersContainer.innerHTML = ""; // Limpia el contenedor de personajes
      // Recorre la lista de personajes y los muestra en el DOM
      characters.forEach((character) => {
        const characterCard = characterTemplate.cloneNode(true);
        characterCard.querySelector("img").src = character.image;
        characterCard.querySelector("img").alt = character.name
        characterCard.querySelector(".detail-character").href = `/character.html?id=${character.id}`;
        characterCard.querySelector("h2").textContent = character.name;
        characterCard.querySelector(".status-icon").classList.add(character.status.toLowerCase());
        characterCard.querySelector(".status").textContent = character.status;
        characterCard.querySelector(".species").textContent = character.species;
        characterCard.querySelector(".origin").textContent =
          character.origin.name;
        characterCard.querySelector(".location").textContent =
          character.location.name;

        charactersContainer.appendChild(characterCard); // Agrega el personaje al contenedor
      });
    });

  };

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    const filteredCharacters = characterList.filterByName(query);
    displayCharacters(filteredCharacters);

  });

  prevButton.addEventListener('click', () => {
    if (prevPage) {
      fetchCharacters(prevPage);
    }
  });

  nextButton.addEventListener('click', () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  });

  fetchCharacters(URL);
});
