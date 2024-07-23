<template>
  <div class="member__card">
    <div class="member-avatar">
      <img width="50" height="50" src="@/assets/images/mockuser.png" alt="" class="member-image" />
      <span class="member-nationality">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_151_427)">
            <path d="M0 0.0195618V19.9805H20V0.0195618H0Z" fill="#F0F0F0" />
            <path d="M0 0.0198822H20V19.9811H0V0.0198822Z" fill="#0052B4" />
            <path d="M0 0.0198822H20V6.67339H0V0.0198822Z" fill="#F0F0F0" />
            <path d="M0 13.3266H20V19.9801H0V13.3266Z" fill="#D80027" />
          </g>
          <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="url(#paint0_linear_151_427)" />
          <defs>
            <linearGradient id="paint0_linear_151_427" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFDA44" />
              <stop offset="0.5" stop-color="#F7EDC2" />
              <stop offset="1" stop-color="#DFB300" />
            </linearGradient>
            <clipPath id="clip0_151_427">
              <rect width="20" height="20" rx="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>
    <div class="member-bid text-regular" :class="sideColor">
      <span class="member-currency">
        <IconCoinDollar />
      </span>
      50.0
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconCoinDollar from '../icons/IconCoinDollar.vue'

  interface Props {
    side: 'up' | 'down'
    sideColor: 'up-color' | 'down-color'
    hashToColorDark: string
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .member-bid {
    display: flex;
    align-items: center;
    margin-top: 7px;
    &.up-color svg {
      color: $green-dark;
    }
    &.down-color svg {
      color: $red-dark;
    }
    @include media-breakpoint('mobile-mix') {
      display: none;
    }
  }
  .member-avatar {
    position: relative;
    display: inline-block;
  }
  .member-image {
    position: relative;
    width: 3.375em;
    height: 3.375em;
    border: 2px solid v-bind(hashToColorDark);
    border-radius: 50%;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      content: '';
      background-color: red;
      border-radius: 50%;
    }
    @include media-breakpoint('mobile') {
      width: 5vw;
      height: auto;
      border-width: 1px;
    }
    @include media-breakpoint('mobile-landscape') {
      width: 24px;
      height: 24px;
      border-width: 1px;
    }
  }
  .member-currency {
    display: flex;
    align-items: center;
    svg {
      width: 1.208vw;
      height: auto;
      margin-right: 4px;
    }
    @include media-breakpoint('mobile-mix') {
      display: none;
    }
  }
  .member-nationality {
    position: absolute;
    top: 0;
    right: -0.604vw;
    z-index: 2;
    svg {
      width: 1.511vw;
      height: auto;
    }
    @include media-breakpoint('mobile-mix') {
      display: none;
    }
  }
  .member {
    &__card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32.5%;
      text-align: center;
      @include media-breakpoint('mobile') {
        width: unset;
      }
    }
  }
</style>
