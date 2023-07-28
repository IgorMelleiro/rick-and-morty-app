<template>
  <div class="container w-full lg:w-9/12 md:w-9/12 mx-auto p-4">
    <h1 class="text-3xl text-center text-[white] font-semibold mb-4">Rick and Morty Characters</h1>

    <div class="flex flex-row w-full gap-2 mb-4">
      <SearchBar class="w-8/12 lg:w-10/12 md:w-9/12" @search="handleSearch" />
      <SelectOption class="w-4/12 lg:w-2/12 md:w-3/12" @status-selected="handleStatusSelected" />
    </div>

    <!-- Display error message if any -->
    <p v-if="errorMessage" class="text-red-500 font-bold mb-4">{{ errorMessage }}</p>

    <CardGrid :characters="filteredCharacters" />
    <PaginationItem :currentPage="filters.currentPage" :totalPages="totalPages" @update:currentPage="setCurrentPage" />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue' // Composition API imports

import { characterService } from './services/index' // Importing the services from 'CharacterService.js'

import CardGrid from './components/CardGrid.vue'
import PaginationItem from './components/PaginationItem.vue'
import SearchBar from './components/SearchBar.vue'
import SelectOption from './components/SelectOption.vue'

export default {
  components: {
    CardGrid,
    PaginationItem,
    SearchBar,
    SelectOption,
  },
  setup() {
    const characters = ref([])
    const filters = reactive({
      currentPage: 1,
      searchQuery: '',
      statusFilter: '',
    })
    const totalPages = ref(1)
    const selectedStatus = ref('')
    const isLoading = ref(false)
    const cardsPerPage = 6
    const errorMessage = ref('')

    async function fetchCharacters() {
      isLoading.value = true
      try {
        const response = await characterService.getCharacters(filters)
        characters.value = response.data.results
        totalPages.value = response.data.info.pages
        errorMessage.value = ''
      } catch (error) {
        characters.value = []
        errorMessage.value = 'Character not found.'
      } finally {
        isLoading.value = false
      }
    }

    function setCurrentPage(page) {
      filters.currentPage = page
      fetchCharacters()
    }

    function handleSearch(searchQuery) {
      filters.currentPage = 1
      filters.searchQuery = searchQuery
      fetchCharacters()
    }

    function handleStatusSelected(selectedStatus) {
      filters.currentPage = 1
      filters.statusFilter = selectedStatus
      fetchCharacters()
    }

    const filteredCharacters = computed(() => {
      let filteredCharacters = characters.value

      // Filter characters by status
      if (filters.statusFilter) {
        filteredCharacters = filteredCharacters.filter((character) => character.status === filters.statusFilter)
      }

      // Filter characters by search query
      if (filters.searchQuery) {
        filteredCharacters = filteredCharacters.filter((character) =>
          character.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
      }

      // Setting the number of cards displayed in the screen
      return filteredCharacters.slice(0, cardsPerPage) 
    })

    onMounted(fetchCharacters)

    return {
      characters,
      filters,
      totalPages,
      selectedStatus,
      isLoading,
      errorMessage,
      cardsPerPage,
      filteredCharacters,
      setCurrentPage,
      handleSearch,
      handleStatusSelected,
    }
  },
}
</script>
