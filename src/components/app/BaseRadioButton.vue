<template>
  <div class="radio-button">
    <input name="option" type="radio" :id="id" class="hide" :checked="value">
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
})

const value = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.radio-button {
  input {
    display: none;
  }
  // .options > label
  > label {
    display: inline-block;
    padding-left: 18px + 10px;
    position: relative;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 13px;
    cursor: pointer;

    // .options > label:before
    // this creates the outer circle for faux radio button
    &:before {
      content: "";
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 18px;
      height: 18px;
      left: 0;
      top: 50%;
      margin-top: -9px;
      border: 2px solid $green-dark;
      border-radius: 50%;
    }

    // .options > label:after
    // this creates the inner circle for active faux radio button
    &:after {
      content: "";
      box-sizing: border-box;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 5px;
      margin-top: -4px;
      background: $green-dark;
      transition: 0.2s ease-in-out;
      opacity: 0;
    }
  }

  // .options :checked + label:after
  :checked + label {
    &:after {
      opacity: 1;
    }
  }
}
</style>