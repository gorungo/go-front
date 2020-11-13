<template>
  <div class="idea-cover mb-5">
    <div class="idea-cover__box-wrap">
      <div class="idea-cover__tmb" :id="'ith' + idea.hid">
        <div class="idea-cover__tmb-container vertical">
          <router-link :to="{ name: 'IdeaDetails', params: { ideaHid: idea.hid }}">
            <img v-if="idea.attributes.imageUrl" :src="idea.attributes.imageUrl" :id="'im' + idea.hid" alt="idea cover"/>
            <img v-else :src="defaultImageUrl" :id="'im' + idea.hid" class="default" alt="idea cover"/>
          </router-link>
        </div>
      </div>
      <div class="idea-cover__content text-first-uppercase"></div>
      <div class="list-item-dropdown" v-if="canUpdate">
        <idea-actions-dropdown :idea="idea" />
      </div>
    </div>
    <div class="description">
      <div class="description__logo" v-if="author">
        <img v-if="author.attributes.imageUrl" :src="author.attributes.imageUrl" alt="Author logo">
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#2E3A59"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9261 20.0557C20.397 18.235 22 15.3047 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.3047 3.60301 18.235 6.07388 20.0557C6.11934 20.0892 6.16509 20.1223 6.21112 20.1551C6.65997 20.4742 7.1363 20.7573 7.63587 21C8.95464 21.6407 10.4354 22 12 22C13.5646 22 15.0454 21.6407 16.3641 21C16.3909 20.987 16.4177 20.9738 16.4443 20.9606C16.9657 20.7015 17.4613 20.3982 17.9261 20.0557ZM17.2287 18.055C18.926 16.588 20 14.4194 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.4194 5.07401 16.588 6.77128 18.055C7.80066 16.2313 9.75654 15 12 15C14.2435 15 16.1993 16.2313 17.2287 18.055ZM15.5567 19.1679C14.8921 17.8803 13.5488 17 12 17C10.4512 17 9.10792 17.8803 8.44332 19.1679C9.51467 19.7005 10.7224 20 12 20C13.2776 20 14.4853 19.7005 15.5567 19.1679Z" fill="#2E3A59"/>
        </svg>

      </div>
      <div class="description__info">
        <h3 class="description__info-title">{{idea.attributes.title}}</h3>
        <span v-if="author" class="description__info-author-title" >{{author.attributes.displayName}}</span>
        <span v-if="price" class="description__info-price">{{localePrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import IdeaActionsDropdown from "@/components/idea/IdeaActionsDropdown";
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
    },

    defaultImageUrl(){
      return 'images/idea/card-placeholder.png'
    }
  },

  methods: {
    resize(){
      const cover = document.getElementById('ith' + this.idea.hid)
      const coverImage = document.getElementById('im' + this.idea.hid)
      if(cover){
        cover.style.height = cover.offsetWidth * 1.33 + 'px'
      }
      if(coverImage){
        coverImage.style.height = cover.style.height
      }
    }
  }
}
</script>

<style lang="scss">
  img.default{
    object-fit: scale-down !important;
  }

</style>
