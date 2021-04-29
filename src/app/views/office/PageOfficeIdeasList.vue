<template>
  <div id="PageOfficeIdeasList">
    <div class="container mt-4 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="text-first-uppercase">{{ $t('office.manageIdeas') }}</h2>
        <button role="button" @click="handleAddNewClick" class="btn btn-primary">{{ $t('text.create') }}</button>
      </div>
      <div class="mt-2">
        <office-ideas-list
            v-if="!loading"
            :value="value"
            @edit="handleEdit"
            @delete="handleDelete"
        />
      </div>

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
    ...mapActions('OfficeIdeaListing', ['fetchUserIdeas', 'createEmptyIdea']),

    handleAddNewClick(){
      this.createEmptyIdea()
    },

    handleEdit(idea){
      window.location =  `${process.env.VUE_APP_PATH}/editor/idea/${idea.hid}`
    },

    handleDelete(){
      //
    }
  },

}

</script>

<style lang="scss">

</style>
