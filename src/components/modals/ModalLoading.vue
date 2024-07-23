<template>
  <BaseModal modal-type="secondary" :active-modal="true" @close-callback="modalStore.close(id)">
    <div class="modal-loading">
      <div class="modal-loading__icon"><IconLoading /></div>
      <div class="modal-loading__title">Waiting...</div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/app/BaseModal.vue'
import IconLoading from '@/components/icons/IconLoading.vue'

import { useModalStore } from '@/store/modal'

// Types

interface Props {
  id: string,
}

// Stores

const modalStore = useModalStore()

// Component settings

withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">

@keyframes loading {
    100% {
        rotate: 360deg;
    }
}
.modal-loading__icon{
  animation: 1.5s linear 0s infinite normal forwards running loading;
}
.modal-loading {
  padding: 40px;
  text-align: center;

  &__icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 40px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
