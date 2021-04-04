<template>
  <div id="office-ideas-list">
    <div v-if="value.length > 0">
      <list-item-line
          v-for="idea in value"
          :key="idea.hid"
          :item="idea"
          @edit="$emit('edit')"
          @delete="$emit('delete')"
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


}
</script>

<style scoped>

</style>
