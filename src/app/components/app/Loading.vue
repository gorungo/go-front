<template>
  <div class="loading" :class="{small}">
    <div class="ball-loader">
      <div class="ball-loader-ball ball1"></div>
      <div class="ball-loader-ball ball2"></div>
      <div class="ball-loader-ball ball3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    small: {
      type: Boolean,
      default: () => false,
    },
    smallest: {
      type: Boolean,
      default: () => false,
    }

  }
}
</script>

<style scoped lang="scss">
$width: 100;
.small{
  $width: 50;
}

.smallest{
  $width: 25;
}


$color: white;

.loading {
  position: relative;
  height: 50px;

  .ball-loader {
    position: absolute;
    width: $width + 0px;
    height: ($width / 3) - 10px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    .ball-loader-ball {
      will-change: transform;
      height: ($width / 3) - 10px;
      width: ($width / 3) - 10px;
      border-radius: 50%;
      border: 2px solid var(--primary);
      position: absolute;
      animation: grow 1s ease-in-out infinite alternate;

      &.ball1 {
        left: 0;
        transform-origin: 100% 50%;
      }

      &.ball2 {
        left: 50%;
        transform: translateX(-50%) scale(1);
        animation-delay: 0.33s;
      }

      &.ball3 {
        right: 0;
        animation-delay: 0.66s;
      }
    }
  }
}

@keyframes grow {
  to {
    transform: translateX(-50%) scale(0);
  }
}


</style>
