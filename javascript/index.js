import { RickAndMortyAPI } from "./RickAndMortyAPI.js"; // Realiza la peticion a la API
import { CharacterList } from "./CharacterList.js"; // Crea la lista de personajes

document.addEventListener("DOMContentLoaded", async () => {
  const charactersContainer = document.getElementById("characters"); // Contenedor de personajes
  const characterTemplate =
    document.getElementById("character-template").content; // Plantilla de personaje

  const api = new RickAndMortyAPI(); // Instancia de la clase RickAndMortyAPI
  const characterList = new CharacterList(); // Instancia de la clase CharacterList
  const data = await api.getCharacters(); // Realiza la peticion a la API
  characterList.setCharacters(data.results); // Crea la lista de personajes

  // Muestra los personajes en el DOM
  const displayCharacters = (characters) => {
    charactersContainer.innerHTML = ""; // Limpia el contenedor de personajes
    // Recorre la lista de personajes y los muestra en el DOM
    characters.forEach((character) => {
      const characterCard = characterTemplate.cloneNode(true);
      characterCard.querySelector("img").src = character.image;
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
  };
  displayCharacters(characterList.characters);
});
