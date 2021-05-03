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
            :value="userIdeas"
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
import {showNotify} from "@/js/notification";
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
  },

  computed: {
    ...mapState('OfficeIdeaListing', ['userIdeas']),
  },

  methods: {
    ...mapActions('OfficeIdeaListing', [
      'fetchUserIdeas',
      'createEmptyIdea',
      'deleteIdea',
    ]),

    handleAddNewClick(){
      this.createEmptyIdea().then(() => {
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.createSuccess') + '!',
          type: 'success',
          showClose: true,
        });
      }).catch( ()=> {
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.error') + '!',
          type: 'error',
          showClose: true,
        });
      })
    },

    handleEdit(idea){
      window.location =  `${process.env.VUE_APP_PATH}/editor/idea/${idea.hid}`
    },

    handleDelete(idea){
      this.deleteIdea(idea).then(() => {
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.deleteSuccess') + '!',
          type: 'success',
          showClose: true,
        });
      }).catch(() => {
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.error') + '!',
          type: 'error',
          showClose: true,
        });
      })
    }
  },

}

</script>

<style lang="scss">

</style>
