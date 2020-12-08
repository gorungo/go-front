<template>
  <div id="office-ideas-list">
    <div class="py-3 header_vs_btn d-flex justify-content-between">
      <h2 class="text-first-uppercase">{{ Lang.get('texts.my_ideas') }}</h2>
      <a href="/ideas/create" class="btn btn-lg btn-outline-primary">{{ Lang.get('idea.create') }}</a>
    </div>
    <div v-if="userIdeas.length > 0">
      <list-item-line
          v-for="idea in userIdeas"
          :key="idea.hid"
          :item="idea"
          @edit="handleEdit"
          @delete="handleDelete"
      />
    </div>
    <loading v-if="loading"/>
    <el-card class="box-card" v-if="userIdeas.length === 0">
      <h5 class="text-center">Нет идей</h5>
    </el-card>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ListItemLine from "./ListItemLine";
import Loading from "@/app/components/app/Loading";

export default {
  name: "OfficeIdeasList",
  components: {ListItemLine, Loading},

  data() {
    return {
      ideas: [],
      loading: false,
    }
  },

  async mounted() {
    try {
      if (this.userIdeas.length === 0) {
        this.loading = true;
        await this.fetchUserIdeas();
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  },

  computed: {
    ...mapState('Idea', ['userIdeas']),
  },

  methods: {
    ...mapActions('Idea', ['fetchUserIdeas']),

    // handleEdit(idea) {
    //   window.location.href = idea.attributes.editUrl;
    // },
    //
    // handleDelete(idea) {
    //   //
    // }
  },

}
</script>

<style scoped>

</style>
