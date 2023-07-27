<!-- components/Pagination.vue -->
<template>
  <div class="flex justify-center space-x-4 mt-4">
    <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Prev</button>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    prevPage() {
      this.$emit('update:currentPage', this.currentPage - 1);
    },
    nextPage() {
      this.$emit('update:currentPage', this.currentPage + 1);
    },
  },
};
</script>

<style>
/* Add any additional styling you want for the pagination here */
</style>
