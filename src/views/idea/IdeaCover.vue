<template>
  <div class="idea-cover mb-5">
    <div class="idea-cover__box-wrap">
      <div class="idea-cover__tmb" :id="'ith' + idea.hid">
        <div class="idea-cover__tmb-container vertical">
          <router-link :to="{ name: 'IdeaDetails', params: { ideaHid: idea.hid }}">
            <img :src="idea.attributes.imageUrl" :id="'im' + idea.hid" alt="idea cover"/>
          </router-link>
        </div>
      </div>
      <div class="idea-cover__content text-first-uppercase">

      </div>
      <div class="list-item-dropdown" v-if="canUpdate">
        <idea-actions-dropdown :idea="idea" />
      </div>
    </div>
    <div class="idea-cover__footer mt-2">
      <div>
        <span class="idea-cover__title">{{idea.attributes.title}}</span>
      </div>

      <span class="price" v-if="price">{{localePrice}}</span>

      <div class="author" v-if="author">
        <img class="author-tmb mr-1" :src="author.attributes.imageUrl" alt="">
        <span class="author-title">{{author.attributes.displayName}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import IdeaActionsDropdown from "@/views/idea/IdeaActionsDropdown";
export default {
name: "IdeaCover",
  components: {IdeaActionsDropdown},
  props: {
    idea: Object,
    user: {
      type: Object,
      default: null,
    }
  },

  mounted(){
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  computed: {

    price(){
      return this.idea.relationships.price ? this.idea.relationships.price : null
    },

    author(){
      return this.idea.relationships.author ? this.idea.relationships.author : null
    },

    localePrice(){
      return this.price ? new Intl.NumberFormat(this.$root.$i18n.locale, { style: 'currency', currency: this.price.relationships.currency.attributes.code }).format(this.price.attributes.price) : null
    },

    canUpdate(){
      if(this.idea && this.user){
        return this.idea.attributes.author_id === this.user.id
      }
      return false
    }
  },

  methods: {
    resize(){
      const cover = document.getElementById('ith' + this.idea.hid)
      const coverImage = document.getElementById('im' + this.idea.hid)
      cover.style.height = cover.offsetWidth * 1.33 + 'px'
      coverImage.style.height = cover.style.height
    }
  }
}
</script>

<style lang="scss">

</style>