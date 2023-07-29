<template>
  <div class="flex justify-center space-x-4 mt-8">
    <button @click="prevPage" :disabled="isFirstPage" class="px-4 py-2 text-white rounded-xl disabled:opacity-50">
      <i class="fas fa-chevron-left"></i>
    </button>

    <div class="flex space-x-2">
      <button v-for="page in displayedPages" :disabled="page === '...'"  :key="page" @click="goToPage(page)" :class="{ 'bg-gray-500 text-white': currentPage === page, 'bg-[#373d48] text-gray-300': currentPage !== page }" class="px-4 py-2 rounded-xl disabled:opacity-50">
        {{ page }}
      </button>
    </div>

    <button @click="nextPage" :disabled="isLastPage" class="px-4 py-2 text-white rounded-xl disabled:opacity-50">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const isFirstPage = computed(() => props.currentPage === 1)
    const isLastPage = computed(() => props.currentPage === props.totalPages)

    // Methods
    function prevPage() {
      emit('update:currentPage', props.currentPage - 1)
    }

    function nextPage() {
      emit('update:currentPage', props.currentPage + 1)
    }

    function goToPage(page) {
      emit('update:currentPage', page)
    }

    // Computed property to generate an array of displayed page numbers
    const displayedPages = computed(() => {
      const pages = []
      const currentPage = props.currentPage
      const totalPages = props.totalPages
      const maxDisplayedPages = 5 // Display only the first 5 pages

      if (totalPages <= maxDisplayedPages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
        return pages
      }

      if (currentPage <= maxDisplayedPages - 3) {
        for (let i = 1; i <= maxDisplayedPages - 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        return pages
      }

      if (currentPage >= totalPages - 4) {
        pages.push('...')
        for (let i = totalPages - maxDisplayedPages ; i <= totalPages; i++) {
          pages.push(i)
        }
        return pages
      }

      pages.push('...')
      for (let i = currentPage - 2; i <= currentPage ; i++) {
        pages.push(i)
      }
      pages.push('...')
      return pages
    })

    // Show '...' only if there are more pages to display
    const showEllipsis = computed(() => {
      return displayedPages.value[displayedPages.value.length - 1] !== props.totalPages
    })

    return {
      isFirstPage,
      isLastPage,
      prevPage,
      nextPage,
      displayedPages,
      showEllipsis,
      goToPage
    }
  }
}
</script>
