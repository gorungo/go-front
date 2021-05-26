<template>
  <div class="category-selector">
    <button type="button" class="category-selector__category" :style="`background-image: url('/images/c/${category.attributes.slug}2x.jpg'); background-size: cover;`" v-for="category in categoryChildren" @click="handleCategoryClick(category)">
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
    }
  },

  methods: {
    ...mapActions('CategorySelector', ['setActiveCategory', 'fetchCategories']),
    ...mapActions('Filters', ['setFilter']),

    async handleCategoryClick(category){
      await this.setFilter({
        category: category.id
      })

      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

  }
}
</script>

<style scoped lang="scss">
.category-selector{
  display: flex;
  column-gap: 1rem;
  .category-selector__category{
    line-height: 1.2rem;
    height: 80px;
    width: 200px;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: inset 0 -3rem 2rem rgba(26, 27, 33, 0.65);

    color: white;
    font-size: 18px;
    font-weight: bold;
    word-break: break-all;
  }

}
</style>
