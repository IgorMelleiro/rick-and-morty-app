<template>
  <div name="fade" tag="div" class="p-8 lg:p-0 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CharacterCard from './CharacterCard.vue';

export default defineComponent({
  components: {
    CharacterCard,
  },
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
});
</script>
