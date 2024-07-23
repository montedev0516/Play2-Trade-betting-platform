<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  interface Props {
    date?: { end: number; start: number }
    remainedSeconds?: string
  }

  const props = withDefaults(defineProps<Props>(), {})
  const emits = defineEmits<{ reRender: [date: number] }>()

  const getUtcDateNow = computed(() => ({
    date_expire: props.date?.end,
    date_created: props.date?.start,
    date_now: Date.now()
  }))

  const animationTime = ref<number>()
  onMounted(() => {
    const date_expire = getUtcDateNow.value?.date_expire
    const date_now = getUtcDateNow.value?.date_now
    if (date_expire === undefined || date_now === undefined) {
      // Handle the case where date_expire or date_now is not defined
      return
    }
    animationTime.value = (date_expire - date_now) / 1000
  })

  const $loader = ref<HTMLElement | null>(null)

  const dashOffset = ref(0)
  const observer = ref<ResizeObserver | null>(null)

  onMounted(() => {
    observer.value = new ResizeObserver(() => {
      calculateCircleSize()
    })
    observer.value.observe($loader.value as HTMLElement)
    window.addEventListener('focus', reCalculateTraveledDistance)
  })

  onUnmounted(() => {
    observer.value?.disconnect()
    window.removeEventListener('focus', reCalculateTraveledDistance)
  })

  function reCalculateTraveledDistance() {
    const start = props.date?.start
    const end = props.date?.end
    if (start === undefined || end === undefined) {
      // Handle the case where start or end is not defined
      return
    }
    if (!$loader.value) return
    const padding = window.getComputedStyle($loader.value)?.padding || '11px'

    const allDistance = end - start
    const traveledDistance = Date.now() - start
    const percentageTraveledDistance = Math.floor((traveledDistance / allDistance) * 100)
    const r = ($loader.value?.clientWidth || 0) / 2 - Number(padding?.replace('px', '') || 0)

    const dash_array = 2 * Math.PI * r
    const offsetDistance = (dash_array / 100) * percentageTraveledDistance

    const loaderElement = $loader.value as HTMLElement
    loaderElement.style.setProperty('--offset', `${offsetDistance > 0 ? offsetDistance : 0}px`)
  }

  function calculateCircleSize() {
    const emptyCircle = document.getElementById('empty__circle')
    const filledCircle = document.getElementById('fill_circle')

    if (!$loader.value || !emptyCircle || !filledCircle) return
    const padding = window.getComputedStyle($loader.value)?.padding || '11px'

    const cx = $loader.value?.clientHeight / 2
    const cy = $loader.value?.clientWidth / 2
    const r = $loader.value?.clientWidth / 2 - Number(padding?.replace('px', '') || 0)

    const dashArray = 2 * Math.PI * r
    dashOffset.value = dashArray

    emptyCircle.setAttribute('r', String(r))
    emptyCircle.setAttribute('cx', String(cx))
    emptyCircle.setAttribute('cy', String(cy))
    emptyCircle.setAttribute('stroke-dasharray', String(dashArray))

    filledCircle.setAttribute('r', String(r))
    filledCircle.setAttribute('cx', String(cx))
    filledCircle.setAttribute('cy', String(cy))
    filledCircle.setAttribute('stroke-dasharray', String(dashArray))
  }

  const remainedSeconds = ref<number | null>(null)

  if (props.date?.end && props.date?.start) {
    remainedSeconds.value = Math.round((props.date.end - props.date.start) / 1000)

    setInterval(() => {
      if (!props.date) return
      remainedSeconds.value = Math.round((props.date.end - Date.now()) / 1000)
      
      if (remainedSeconds.value < 0) {
        emits('reRender', Date.now())
      }
    }, 1000)
  }
</script>

<template>
  <div class="timer-wrapper" ref="$loader">
    <svg class="loader">
      <circle id="empty__circle" stroke="#0C0D13" stroke-width="0.375em" fill="none" />
      <circle
        id="fill_circle"
        stroke="#F4D56F"
        stroke-width="0.375em"
        fill="none"
        stroke-dashoffset="0px"
        stroke-linecap="round"
        :style="`animation: countdown ${animationTime}s linear forwards`"
      />
    </svg>
    <span class="timer text-number-large">{{ remainedSeconds }} <span class="text-small">SEC</span></span>
  </div>
</template>

<style lang="scss">
  .timer-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1.208vw;
    .timer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  svg {
    @include media-breakpoint('mobile') {
      stroke-width: 3px;
    }
  }
  #empty__circle,
  #fill_circle {
    @include media-breakpoint('mobile') {
      stroke-width: 3px;
    }
  }
  svg.loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg) rotateZ(-90deg);
    --offset: 0px;
  }
  @keyframes countdown {
    0% {
      stroke: $primary;
      stroke-dashoffset: var(--offset);
    }
    50% {
      stroke: orange;
    }
    100% {
      stroke: red;
      stroke-dashoffset: v-bind(dashOffset);
    }
  }
</style>
