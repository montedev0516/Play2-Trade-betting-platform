import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBaseStore = defineStore('base', () => {
  const count = ref<number>(0)

  return { count }
})
