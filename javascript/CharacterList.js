import { Character } from "./Character.js";

export class CharacterList {
  constructor() {
    this._characters = [];
  }

  setCharacters(characters) {
    this._characters = characters.map((character) => new Character(character));
    console.log("CHARACTERS", this._characters);
  }

  get characters() {
    return this._characters;
  }
}
