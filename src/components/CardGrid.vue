<!-- components/CardGrid.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
  </div>
</template>

<script>
import CharacterCard from './CharacterCard.vue';

export default {
  components: {
    CharacterCard,
  },
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
};
</script>
