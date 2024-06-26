export class RickAndMortyAPI {
  constructor() {
    this._baseURL = "https://rickandmortyapi.com/api";
  }

  async getCharacters(url = `${this._baseURL}/character`) {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error fetching characters... Sorry!");
    }
  }

  get baseURL() {
    return this._baseURL;
  }
}
