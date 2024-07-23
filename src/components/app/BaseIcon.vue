<template>
  <svg v-bind="attrs" fill="none" v-html="path" style="pointer-events: none" />
</template>

<script setup lang="ts">
import { iconAttributes, icons } from '@/utils/icon'
import { ref } from 'vue'

interface Props {
  width?: string
  height?: string
  name?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '24',
  height: '24',
  name: '',
  color: '#B6B6B8'
})

const path = ref<string>(icons[props.name])
const attrs = iconAttributes(props.width, props.height, props.color)
</script>