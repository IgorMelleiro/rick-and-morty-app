<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex">
    <img :src="character.image" :alt="character.name" class="w-40 h-auto object-cover" />
    <div class="flex-grow p-4">
      <h3 class="text-lg font-bold">{{ character.name }}</h3>
      <p class="text-sm text-gray-500">{{ character.status }} - {{ character.species }}</p>
      <div class="mt-2">
        <span class="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">{{ character.gender }}</span>
        <span class="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">{{ character.origin.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Add any custom styling for the card here */
</style>
