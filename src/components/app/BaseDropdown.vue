<template>
  <div class="container">
    <label  class="label" :for="name">{{ props.label }}</label>
    <div :class="['dropdown', { 'dropdown--open': isOpen }]" @click="toggle">
        <div v-for="(option, optionIndex) in sortedOptions" :key="option.id" :class="['option', { 'option--open': isOpen }]" @click.stop="select(option.id)">
          <div v-if="option.iconName" :class="['option__icon', { 'option__icon--rounded': roundedIcons }]">
            <component :is="option.iconName" />
          </div>
          <div class="option__label">{{ option.label }}</div>
          <div :class="['dropdown__toggler', { rotate: isOpen }]"><IconChevronDown v-if="!optionIndex" /></div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

type Option = {
  id: string
  label: string
  iconName?: ReturnType<typeof defineComponent>
}

interface Props {
  name: string
  label?: string
  options?: Option[]
  roundedIcons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  options: () => [],
  roundedIcons: false,
})

const value = defineModel<string | undefined>({ default: undefined });

const isOpen = ref(false)

const sortedOptions = computed(() => [...props.options].sort((a, b) => {
  if (a.id === value.value) return -1
  if (b.id === value.value) return 1
  return 0
}))

const toggle = () => isOpen.value = !isOpen.value

const select = (optionId: Option['id']) => {
  value.value = optionId

  toggle()
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 44px;
  position: relative;
  align-items: center;
  justify-content: space-between;

  @include media-breakpoint('mobile-mix') {
    height: 30px;
  }
}

.label {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;

  @include media-breakpoint('mobile-mix') {
    font-size: 12px;
    line-height: 9px;
  }
}

.dropdown {
  height: 100%;
  padding: 6px 0;
  border-radius: 4px;
  border: 2px solid #FCD758;
  background-color: $bg-light;
  overflow-y: hidden;
  cursor: pointer;

  @include media-breakpoint('mobile-mix') {
    padding: 3px 0;
  }

  &--open {
    height: auto;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__toggler {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 9px;
    margin-left: auto;
    color: #707070;

    @include media-breakpoint('mobile-mix') {
      width: 9px;
      height: 6px;
    }

    svg  {
      width: 100%;
      height: 100%;
    }
  }
}

.option {
  display: flex;
  padding: 6px 12px;
  align-items: center;
  cursor: pointer;

  @include media-breakpoint('mobile-mix') {
    padding: 4px 10px;
  }

  &--open {
    &:hover {
      background-color: $bg-light-2;
    }
  }

  &__icon {
    display: flex;
    width: 18px;
    height: 18px;
    margin-right: 6px;
    justify-content: center;
    align-items: center;

    &--rounded {
      border-radius: 50%;
      overflow: hidden;
    }

    @include media-breakpoint('mobile-mix') {
      width: 12px;
      height: 12px;
    }

    svg  {
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    margin-right: 19px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;

    @include media-breakpoint('mobile-mix') {
      margin-right: 25px;
      font-size: 12px;
      line-height: 10px;
      line-height: 10px;
      line-height: 9px;
    }
  }
}
</style>