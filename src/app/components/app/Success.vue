<template>
  <div class="success">
    <svg id="successIcon" class="success__svg" @load="addScaleClass" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.98965 11.293L10.9394 16.2428L9.52519 17.657L4.57544 12.7072L5.98965 11.293Z" :fill="fill"/>
      <path d="M9.52518 14.8285L18.0105 6.34326L19.4247 7.75748L10.9394 16.2428L9.52518 14.8285Z" :fill="fill"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: {
    fill: {
      type: String,
      default: 'black'
    }
  },

  methods: {
    addScaleClass(){
      document.getElementById('successIcon').classList.add('scale-in')
    }
  }

}
</script>

<style scoped lang="scss">
.success{
  display: flex;
  align-items: center;
  justify-content: center;
  .success__svg{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}

.scale-in{
  animation: scalein 0.5s;
}
@keyframes scalein {
  0%   { transform: scale(0); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}


</style>
