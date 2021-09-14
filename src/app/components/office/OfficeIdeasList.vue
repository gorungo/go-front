<template>
  <div id="office-ideas-list">
    <div v-if="activeIdeas.length > 0">
      <h4>Активные идеи</h4>
      <list-item-line
          v-for="idea in activeIdeas"
          :key="idea.hid"
          :item="idea"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
      />
    </div>
    <div v-if="value.length > 0" class="mt-2">
      <h4>Время идеи прошло</h4>
      <list-item-line
          v-for="idea in outDateIdeas"
          :key="idea.hid"
          :item="idea"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
      />
    </div>
    <div v-if="value.length > 0" class="mt-2">
      <h4>Черновики</h4>
      <list-item-line
          v-for="idea in notPublishedIdeas"
          :key="idea.hid"
          :item="idea"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
      />
    </div>
    <el-card class="box-card" v-if="value.length === 0">
      <h5 class="text-center">{{ $t('office.noIdeas') }}</h5>
    </el-card>
  </div>
</template>

<script>
import ListItemLine from "./ListItemLine"

export default {
  name: "OfficeIdeasList",
  components: {ListItemLine},
  props: {
    value: Array,
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    activeIdeas(){
      return this.value.filter( idea => {
        return this.isPublished(idea) && !this.outDate(idea)
      })
    },
    outDateIdeas(){
      return this.value.filter( idea => {
        return this.isPublished(idea) && this.outDate(idea)
      })
    },
    notPublishedIdeas(){
      return this.value.filter( idea => {
        return !this.isPublished(idea)
      })
    }
  },

  methods: {
    isPublished(idea){
      return idea.attributes.is_published
    },
    outDate(idea){
      return idea.relationships.future_dates.length === 0
    }
  }


}
</script>

<style scoped>

</style>
