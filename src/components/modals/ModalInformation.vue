<template>
  <BaseModal modal-type="secondary" :active-modal="true">
    <div class="information-modal">
      <component :is="iconComponent" />
      <p class="information-modal__text">{{ props.text }}</p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, defineComponent } from 'vue'
  import BaseModal from "@/components/app/BaseModal.vue";
  import IconError from '@/components/icons/IconError.vue'
  import IconWarning from '@/components/icons/IconWarning.vue'
  import IconSuccess from '@/components/icons/IconSuccess.vue'

  interface Props {
    text: string,
    icon: 'success' | 'warning' | 'error'
  }
  const props = defineProps<Props>()

  const iconComponent = computed<ReturnType<typeof defineComponent> | null>(() => {
    switch (props.icon) {
      case 'success': return IconSuccess;
      case 'warning': return IconWarning;
      case 'error': return IconError;
      default: return null;
    }
  })
</script>

<style lang="scss" scoped>
  .information-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;

    &__text {
      width: 261px;
      margin-top: 26px;
      font-size: 24px;
      line-height: normal;
      text-align: center;
    }

    svg {
      width: 40px;
      height: 40px;
    }
  }
</style>