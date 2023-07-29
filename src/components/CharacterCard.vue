<template>
  <div v-if="!isLoading" class="flex flex-col md:flex-col lg:flex-row bg-[#3c3e44] text-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-110">
    <img :src="character.image" :alt="character.name" class="w-full lg:w-[220px] object-cover" />
    <div class="flex-grow p-4">
      <h3 class="text-3xl sm:text-lg md:text-xl lg:text-3xl font-bold">{{ character.name }}</h3>
      <p class="flex text-sm text-white"><span class="block self-center mr-2 rounded-full text-xl w-2 h-2" :class="statusClass"></span>{{ character.status }} - {{ character.species }}</p>
      <div class="flex flex-col mt-2 space-y-2">
        <div class="flex flex-col">
          <span class="text-md text-[#9e9e9e]">Last known location:</span>
          <span class="text-lg text-white rounded">{{ character.location.name }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-md text-[#9e9e9e]">Gender:</span>
          <span class="text-lg text-white rounded">{{ character.gender }}</span>
        </div>
      </div>
    </div>
  </div>
  <CardPulse v-else/>
</template>

<script>
import { computed } from 'vue'
import CardPulse from './CardPulse.vue'

export default {
  components: {
    CardPulse
  },
  props: {
    character: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
    
  },
  setup(props) {
    const statusClass = computed(() => {
      const status = props.character.status
      return {
        'bg-green-500': status === 'Alive',
        'bg-red-500': status === 'Dead',
        'bg-gray-500': status === 'unknown'
      }
    })

    return {
      statusClass
    }
  }
}
</script>
