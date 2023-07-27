<!-- components/SearchBar.vue -->
<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search characters by name..."
      class="px-4 py-2 border border-gray-300 rounded-md w-full"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery.trim());
    },
  },
};
</script>
