export class RickAndMortyAPI {
  constructor() {
    this._baseURL = "https://rickandmortyapi.com/api";
  }

  async getCharacters() {
    console.log("URL", this._baseURL);
    const response = await fetch(`${this._baseURL}/character`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error fetching characters... Sorry!");
    }
  }
}
