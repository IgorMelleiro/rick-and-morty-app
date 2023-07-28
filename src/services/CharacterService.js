import axios from "axios"

export default class CharacterService {

  /**
   * Get Characters
   *
   * @param data.currentPage - Optional filter to navitage through pages.
   * @param data.searchQuery - Optional filter to search for characters by name.
   * @param data.statusFilter - Optional filter to sort by Status (Dead, Alive, unknow).
   *
   * @returns {result}
   */
  getCharacters(data) {
    this.results = axios.get(`https://rickandmortyapi.com/api/character/?page=${data.currentPage}&name=${data.searchQuery}&status=${data.statusFilter}`)
    return this.results
  }
}