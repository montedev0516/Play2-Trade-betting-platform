<template>
  <div class="top-up-panel">
    <div class="status">
      <div class="status__title">{{ LOCALES.THE_TOP_UP_PANEL_STATUS }}</div>
      <div class="status__value">{{ LOCALES.THE_TOP_UP_PANEL_STATUS_PENDING }}</div>
    </div>

    <div class="top-up-panel-timer">
      <div class="top-up-panel-loader" ref="$loader" :key="key">
        <svg class="top-up-panel-loader__svg">
          <circle ref="$emptyCircle" class="top-up-panel-loader__empty-circle" stroke="#404040" fill="none" />
          <circle
            ref="$filledCircle"
            class="top-up-panel-loader__filled-circle"
            stroke="#F4D56F"
            fill="none"
            stroke-dashoffset="0"
            stroke-linecap="round"
            :style="`animation: top-up-panel-loader ${animationTime}s linear forwards`"
          />
        </svg>
      </div>
      <div>
        <div class="top-up-panel-timer__title">{{ LOCALES.THE_TOP_UP_PANEL_TIMER }}</div>
        <div class="top-up-panel-timer__value">{{ formattedRemainedTime }}</div>
      </div>
    </div>

    <BaseButton @click="toggleTimer">{{ LOCALES.THE_TOP_UP_PANEL_CANCEL }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import BaseButton from '@/components/app/BaseButton.vue'

const LOCALES = {
  THE_TOP_UP_PANEL_STATUS: 'Status',
  THE_TOP_UP_PANEL_STATUS_PENDING: 'Waiting',
  THE_TOP_UP_PANEL_TIMER: 'Time remaining',
  THE_TOP_UP_PANEL_CANCEL: 'CANCEL',
}

const $loader = ref<HTMLElement | null>(null)
const $emptyCircle = ref<HTMLElement | null>(null)
const $filledCircle = ref<HTMLElement | null>(null)

const key = ref(0)
const startDate = ref(Date.now())
const endDate = ref(startDate.value + 3600_000)
const animationTime = ref<number>()
const remainedSeconds = ref<number>(0)

const getUtcDateNow = computed(() => ({
  date_expire: endDate.value,
  date_now: Date.now()
}))

const formattedRemainedTime = computed(() => {
  const hours = Math.floor(remainedSeconds.value / 3600)
  const hoursFull = `${hours >= 10 ? hours : `0${hours}`}`

  const minutes = Math.floor(remainedSeconds.value % 3600 / 60)
  const minutesFull = `${minutes >= 10 ? minutes : `0${minutes}`}`

  const seconds = remainedSeconds.value % 60
  const secondsFull = `${seconds >= 10 ? seconds : `0${seconds}`}`

  return `${hoursFull}:${minutesFull}:${secondsFull}`
})


const dashOffset = ref(0)
  
onMounted(() => {
  init()
})

const init = () => {
  calculateCircleSize()

  animationTime.value = (getUtcDateNow.value?.date_expire - getUtcDateNow.value?.date_now) / 1000

  if (endDate.value && startDate.value) {
    remainedSeconds.value = Math.round((endDate.value - startDate.value) / 1000)

    setInterval(() => {
      remainedSeconds.value = Math.round((endDate.value - Date.now()) / 1000)

      const date_expire = getUtcDateNow.value?.date_expire
      const date_now = getUtcDateNow.value?.date_now

      animationTime.value = (date_expire - date_now) / 1000

      if (remainedSeconds.value < 0) {
        toggleTimer()
      }
    }, 1000)
  }
}

const toggleTimer = async () => {
  key.value += 1

  await nextTick()

  startDate.value = Date.now()
  endDate.value = startDate.value + 3600_000

  init()
}

const calculateCircleSize = () => {
  if (!$loader.value || !$emptyCircle.value || !$filledCircle.value) return

  const padding = window.getComputedStyle($loader.value)?.padding || '`1px'

  const cx = $loader.value?.clientHeight / 2
  const cy = $loader.value?.clientWidth / 2
  const r = $loader.value?.clientWidth / 2 - Number(padding?.replace('px', '') || 0)

  const dashArray = 2 * Math.PI * r
  dashOffset.value = dashArray

  $emptyCircle.value.setAttribute('r', String(r))
  $emptyCircle.value.setAttribute('cx', String(cx))
  $emptyCircle.value.setAttribute('cy', String(cy))
  $emptyCircle.value.setAttribute('stroke-dasharray', String(dashArray))

  $filledCircle.value.setAttribute('r', String(r))
  $filledCircle.value.setAttribute('cx', String(cx))
  $filledCircle.value.setAttribute('cy', String(cy))
  $filledCircle.value.setAttribute('stroke-dasharray', String(dashArray))
}
</script>

<style scoped lang="scss">
.top-up-panel {
  display: grid;
  padding: 10px 10px 10px 20px;
  border-radius: 4px;
  grid-template-columns: 140px 1fr auto;
  background-color: $bg-main;
}

.status {
  &__title {
    margin-bottom: 8px;
    color: $gray;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
    opacity: 0.5;
  }

  &__value {
    color: $text-white;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
  }
}

.top-up-panel-timer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 3px;

  &__title {
    margin-bottom: 8px;
    color: $gray;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
    opacity: 0.5;
  }

  &__value {
    color: $text-white;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
  }
}

.top-up-panel-loader {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 4px;
  position: relative;
  align-items: center;
  justify-content: center;

  svg {
    --offset: 0px;
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    transform: rotateY(-180deg) rotateZ(-90deg);
    stroke-width: 4px;
  }

  &__empty-circlea,
  &__filled-circlea {
    stroke-width: 4px;
  }
}

@keyframes top-up-panel-loader {
  0% {
    stroke-dashoffset: var(--offset);
  }
  100% {
    stroke-dashoffset: v-bind(dashOffset);
  }
}
</style>
