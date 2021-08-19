<template>
  <div v-if="categories">
    <div class="category-selector">
      <div class="category-selector__categories">
        <router-link v-if="activeCategory" @click="handleCategoryClick(null)" :to="categoryLink(null)" class="category-selector__category category--all">
          <svg class="mr-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.20711 9.20711L5.5 8.5L2 12L5.5 15.5L6.20711 14.7929L3.91416 12.5H22V11.5H3.91425L6.20711 9.20711Z"/>
          </svg>
          <span>{{$t('filter.categoryAll')}}</span>
        </router-link>
        <router-link @click="handleCategoryClick(category)" :to="categoryLink(category)" :class="{active: isActive(category)}" class="category-selector__category" :style="`background-image: url('/images/c/${category.attributes.slug}2x.jpg'); background-size: cover;`" :key="category.id" v-for="category in mainCategories">
          {{category.attributes.title}}
        </router-link>
      </div>
      <div class="category-selector__all" @click="handleAllButtonClick">
        <button type="button" :aria-label="$t('filter.selectCategory')" class="category-selector__all-button" >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" fill="#2E3A59"/>
            <path d="M18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10Z" fill="#2E3A59"/>
            <path d="M10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12Z" fill="#2E3A59"/>
          </svg>
        </button>
      </div>
    </div>
    <category-select-modal :value="activeCategory" :all-categories="categories" ref="CategorySelectModal" @select="handleCategoryClick"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {categoryChildren} from "@/js/go";
import {goRoute} from "@/js/filter";
import CategorySelectModal from "@/app/components/app/CategorySelectModal";

export default {
  name: "CategorySelector",
  components: {CategorySelectModal},
  data(){
    return {
      loading: true,
    }
  },

  async mounted() {
    if(this.categories.length === 0){
      await this.fetchCategories()
    }
    await this.setActiveCategoryById(this.activeCategoryId)
    this.loading = false
  },

  computed: {
    ...mapState('CategorySelector', ['categories', 'activeCategory']),
    ...mapState('Filters', ['filters']),

    categoryChildren(){
      return categoryChildren(this.categories, this.activeCategory)
    },

    mainCategories(){
      return categoryChildren(this.categories, null)
    },

    activeCategoryId(){
      return this.$route.query.category_id ? parseInt(this.$route.query.category_id) : null
    },

  },

  methods: {
    ...mapActions('CategorySelector', ['setActiveCategory', 'setActiveCategoryById', 'fetchCategories']),
    ...mapActions('Filters', ['setFilter']),

    async handleCategoryClick(category){
      this.setActiveCategory(category)
      this.setFilter({
        category_id: category.id
      })
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    isActive(category){
      return this.activeCategoryId === category.id
    },

    handleAllButtonClick(){
      this.$refs.CategorySelectModal.showSelectorWindow()
    },

    categoryLink(category) {
      return this.$router.resolve({
        name: 'IdeaList',
        query: {...this.filters, category_id: category?.id}
      }).resolved
    }
  }
}
</script>

<style scoped lang="scss">

</style>
