<template>
  <div id="PageProfileMain">
    пароль
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "@/app/components/app/Loading";
export default {
  name: "PageProfilePassword",
  components: {Loading},

  data(){
    return {
      value: [],
      loading: true,
    }
  },
  async mounted() {

  },

}

</script>

<style lang="scss">

</style>
