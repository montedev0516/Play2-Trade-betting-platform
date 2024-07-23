<template>
  <div
      v-click-outside="() => !props.preventClickOutside && $emit('closeCallback', false)"
      :class="['pop-up',, `pop-up--position-${position}`, { active: props.activeModal }]"
  >
    <div :class="['pop-up__wrapper', `pop-up__wrapper--position-${position}`, modalSize]" @click.stop>
      <slot name="close">
        <div class="pop-up__close">
          <button class="button" @click="$emit('closeCallback', false)"><IconCloseModal/></button>
        </div>
      </slot>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useCloseESCListener } from '@use/useCloseESCListener'
import IconCloseModal from '@/components/icons/IconCloseModal.vue'

interface Props {
  activeModal?: boolean
  modalType?: 'primary' | 'secondary' | 'large' | 'custom'
  preventClickOutside?: boolean
  position?: 'center-center' | 'top-right'
}

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const props = withDefaults(defineProps<Props>(), {
  modalType: 'custom',
  activeModal: false,
  preventClickOutside: false,
  position: 'center-center',
})
const emit = defineEmits<{ closeCallback: [status: boolean] }>()

const modalSize = computed(() => (props.modalType == 'custom' ? attrs.class : `pop-up__wrapper--${props.modalType}`))

useCloseESCListener(document.body, 'keydown', () => emit('closeCallback', false))
</script>

<style lang="scss" scoped>
.pop-up {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  display: none;
  width: 100%;
  height: 100%;
  background: $pop-up;

  &--position {
    &-center-center {
      padding: 12px;
      justify-content: center;
      align-items: center;
    }

    &-top-right {
      padding: 0 0 0 12px;
      justify-content: end;
      align-items: start;
    }
  }

  &.active {
    display: flex;
  }

  &__wrapper {
    position: relative;
    width: 100%;
    background: $bg-light;

    &--primary {
      max-width: 692px;
    }

    &--secondary {
      max-width: 360px;

      @include media-breakpoint('mobile-mix') {
        max-width: 290px;
      }
    }

    &--large {
      max-width: 780px;
    }

    &--position {
      &-center-center {
        border-radius: 10px;
      }

      &-top-right {
        border-radius: 0px 0px 0px 16px;
      }
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;

    .button {
      background: none;
      color: $gray;
    }
  }
}
</style>