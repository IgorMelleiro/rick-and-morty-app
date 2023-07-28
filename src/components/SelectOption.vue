<template>
  <select v-model="selectedStatus" class="px-4 py-2 text-white bg-[#3c3e44] rounded-md">
    <option value="">All</option>
    <option value="Alive">Alive</option>
    <option value="Dead">Dead</option>
    <option value="unknown">Unknown</option>
  </select>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup(_, { emit }) {
    const selectedStatus = ref('')
    watch(selectedStatus, (newValue) => {
      emit('status-selected', newValue)
    })

    return {
      selectedStatus,
    }
  },
}
</script>
