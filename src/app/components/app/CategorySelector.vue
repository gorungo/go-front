<template>
  <div class="category-selector">
    <button type="button" :class="{active: isActive(category)}" class="category-selector__category" :style="`background-image: url('/images/c/${category.attributes.slug}2x.jpg'); background-size: cover;`" v-for="category in categoryChildren" @click="handleCategoryClick(category)">
      {{category.attributes.title}}
    </button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {categoryChildren} from "@/js/go";
import {goRoute} from "@/js/filter";

export default {
  name: "CategorySelector",

  data(){
    return {
      loading: true,
    }
  },

  async mounted() {
    if(this.categories.length === 0){
      await this.fetchCategories()
    }
    this.loading = false
  },

  computed: {
    ...mapState('CategorySelector', ['categories', 'activeCategory']),
    ...mapState('Filters', ['filters']),
    categoryChildren(){
      return categoryChildren(this.categories, this.activeCategory)
    },

    activeCategoryId(){
      return this.$route.query.category_id ? parseInt(this.$route.query.category_id) : null
    }

  },

  methods: {
    ...mapActions('CategorySelector', ['setActiveCategory', 'fetchCategories']),
    ...mapActions('Filters', ['setFilter']),

    async handleCategoryClick(category){
      await this.setFilter({
        category_id: category.id
      })

      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    isActive(category){
      return this.activeCategoryId === category.id
    }
  }
}
</script>

<style scoped lang="scss">

</style>
