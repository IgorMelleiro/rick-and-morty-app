<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-4">Rick and Morty Characters</h1>
    <!-- Search bar -->
    <SearchBar @search="handleSearch" />
    <!-- Display error message if any -->
    <p v-if="errorMessage" class="text-red-500 font-bold mb-4">{{ errorMessage }}</p>
    <CardGrid :characters="filteredCharacters" />
    <PaginationItem :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="setCurrentPage" />
  </div>
</template>


<script>
import axios from 'axios';
import CardGrid from './components/CardGrid.vue';
import PaginationItem from './components/PaginationItem.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  components: {
    CardGrid,
    PaginationItem,
    SearchBar,
  },
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: 1,
      searchQuery: '',
      errorMessage: '', // Add a new error message property
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.searchQuery}`
        );
        this.characters = response.data.results;
        this.totalPages = response.data.info.pages;
        this.errorMessage = ''; // Clear any previous error message on successful response
      } catch (error) {
        this.characters = []; // Clear character list on error
        this.errorMessage = 'Character Not Found :('; // Display error message to the user
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.fetchCharacters();
    },
    handleSearch(searchQuery) {
      this.currentPage = 1;
      this.searchQuery = searchQuery;
      this.fetchCharacters();
    },
  },
  computed: {
    filteredCharacters() {
      if (this.searchQuery) {
        return this.characters.filter((character) =>
          character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.characters;
      }
    },
  },
  created() {
    this.fetchCharacters();
  },
};
</script>
