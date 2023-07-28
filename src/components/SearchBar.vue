<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search characters by name..."
      class="px-4 py-2 text-white bg-[#3c3e44] focus:outline-none rounded-md w-full"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup(_, { emit }) {
    const searchQuery = ref('');

    watch(searchQuery, (newValue) => {
      emit('search', newValue.trim());
    });

    return {
      searchQuery,
      handleSearch() {
        emit('search', searchQuery.value.trim());
      },
    };
  },
};
</script>
