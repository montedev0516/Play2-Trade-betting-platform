<template>
  <label class="container">
    <span class="label">{{ props.label }}</span>
    <input
        v-bind="$attrs"
        class="input"
        type="checkbox"
        :checked="value"
        @change="value = ($event.target as HTMLInputElement).checked"
    />
    <div v-if="value" class="state state--active">On</div>
    <div v-else class="state state--inactive">Off</div>
    <span class="switch"></span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
})

const value = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  cursor: pointer;
}

.label {
  margin-left: 0;
  overflow: hidden;
  color: #FFF;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include media-breakpoint('mobile-mix') {
    font-size: 12px;
  }
}

.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.state {
  margin-left: auto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;

  @include media-breakpoint('mobile-mix') {
    font-size: 12px;
    line-height: 9px;
  }

  &--active {
    color: $text-white;
  }

  &--inactive {
    color: #999999;
  }
}

.switch {
  --switch-container-width: 32px;
  --switch-size: calc(var(--switch-container-width) / 2.5);

  @include media-breakpoint('mobile-mix') {
    --switch-container-width: 24px;
  }

  position: relative;
  display: flex;
  flex-basis: var(--switch-container-width);
  flex-shrink: 0;
  align-items: center;
  height: 18px;
  background-color: transparent;
  border: 2px solid #2F313C;
  border-radius: var(--switch-size);
  transition: background-color 0.25s ease-in-out;

  @include media-breakpoint('mobile-mix') {
    height: 14px;
  }
}

.switch::before {
  position: absolute;
  left: 2px;
  width: calc(var(--switch-size) - 4px);
  height: calc(var(--switch-size) - 4px);
  content: "";
  background-color: #2F313C;
  border-radius: 24px;
  transition: transform 0.375s ease-in-out;

  @include media-breakpoint('mobile-mix') {
    border-radius: 16px;
  }
}

.input:checked ~ .switch {
  background-color: transparent;
  border: 2px solid $primary;
}

.input:checked ~ .switch::before {
  left: -2px;
  background-color: $primary;
  transform: translateX(
      calc(var(--switch-container-width) - var(--switch-size))
  );
}
</style>