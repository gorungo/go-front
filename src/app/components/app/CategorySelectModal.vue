<template>
  <div id="category-select" class="category-selector">
    <app-dialog
        :title="$t('filter.selectCategory')"
        :visible.sync="dialogIsVisible"
        :fullscreen = "isMobile"
        v-if="dialogIsVisible"
    >
      <div class="modal-title mb-1" v-if="parentCategory">
        <button type="button" class="btn btn-outline-primary" @click="goParentCategory">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11L7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13L20 13V11Z" fill="#2E3A59"/>
          </svg>
          <span></span>
        </button>
        <div><span class="modal-title__text">{{ parentCategory.attributes.title }}</span></div>
      </div>
      <div v-if="allCategories.length && !loading" class="list">
        <button type="button" v-for="category in categoryChildren(parentCategory)"
            :key="category.id"
            class="btn list__item"
            @click="select(category)">
          <span class="list__item-title">{{ category.attributes.title }}</span>
          <svg class="list__item-title--arrow" v-if="categoryChildren(category).length > 0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 13L16.17 13L12.59 16.59L14 18L20 12L14 6L12.59 7.41L16.17 11L4 11L4 13Z" fill="#2E3A59"/>
          </svg>
          <span class="list__item-title--select" v-if="categoryChildren(category).length === 0">{{ $t('text.select') }}</span>
        </button>
      </div>
    </app-dialog>
  </div>
</template>

<script>
import AppDialog from "@/app/components/app/AppDialog"
import Loading from "@/app/components/app/Loading"
import {mapState} from "vuex";

export default {
  name: "CategorySelectModal",

//------DATA-----------------------------------------------------------------------------------------------

  data() {
    return {
      type: 'categories',
      searchMinimum: 3,
      mode: 'select', // show or select
      selectedCategories: {},
      searchTitle: '',
      dialogIsVisible: false,
      parentCategory: null,
    }
  },

  components: {
    Loading,
    AppDialog,
  },

  model: {
    prop: 'value',
    event: 'change'
  },

//------PROPERTIES-----------------------------------------------------------------------------------------------

  props: {
    value: {
      type: Object,
    },
    allCategories: {
      type: Array,
      default: () => {
        return []
      }
    },

    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    maxCategories: {
      type: Number,
      default: () => {
        return 2
      }
    }
  },

//------METHODS-----------------------------------------------------------------------------------------------

  computed: {
    ...mapState('App', ['isMobile']),
  },
  methods: {
    select: function (category) {
      if(this.categoryChildren(category).length > 0){
        this.parentCategory = category
        return
      }

      this.$emit('select', category);
      this.closeSelectorWindow();
    },

    goParentCategory(){
      this.parentCategory = this.categoryParent(this.parentCategory)
    },

    showSelectorWindow() {
      this.dialogIsVisible = true
    },

    closeSelectorWindow: function () {
      this.dialogIsVisible = false
      this.parentCategory = null
    },

    handleAddButtonClick(){
      this.showSelectorWindow()
    },

    categoryParent(category){
      if(!category || category.attributes.parent_id === 0){
        return null
      }
      return this.allCategories[this.allCategories.indexOf(category)]
    },

    categoryChildren(category) {
      if(category === null){
        return this.allCategories.filter( item => {
          return item.attributes.parent_id === 0
        })
      }
      return this.allCategories.filter( item => {
        return category.id === item.attributes.parent_id
      })
    }

  },

//------COMPUTED-----------------------------------------------------------------------------------------------


}
</script>

<style scoped lang="scss">
.category-selector{
  width: 100%;
}
.modal-body{
  padding: 1rem !important;
}
.modal-title{
  display: flex;
  align-items: center;
}
.modal-title__text{
  margin-left: 1rem;
  font-weight: bold;
  font-size: 18px;
}

</style>
