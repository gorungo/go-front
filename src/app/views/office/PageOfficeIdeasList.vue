<template>
  <div id="PageOfficeIdeasList">
    <div class="container mt-4 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="text-first-uppercase">{{ $t('office.manageIdeas') }}</h2>
        <a href="/ideas/create" class="btn btn-primary">{{ $t('text.create') }}</a>
      </div>
      <office-ideas-list
          v-if="!loading"
          :value="value"
          @delete="handleDelete"
      />
      <loading v-if="loading"/>
    </div>
  </div>
</template>

<script>
import OfficeIdeasList from "@/app/components/office/OfficeIdeasList";
import Loading from "@/app/components/app/Loading";
import {mapActions, mapState} from "vuex";
export default {
  name: "PageOfficeIdeasList",
  components: {OfficeIdeasList, Loading},

  data(){
    return {
      value: [],
      loading: true,
    }
  },
  async mounted() {
    if(this.userIdeas.length === 0) await this.fetchUserIdeas()
    this.loading = false
    this.value = this.userIdeas ? this.userIdeas : []
  },

  computed: {
    ...mapState('OfficeIdeaListing', ['userIdeas']),
  },

  methods: {
    ...mapActions('OfficeIdeaListing', ['fetchUserIdeas']),

    handleDelete(){
      //
    }
  },

}

</script>

<style lang="scss">

</style>
