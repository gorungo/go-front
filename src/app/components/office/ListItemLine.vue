<template>
  <div class="list-item">
    <div class="list-item__content">
      <img v-if="item.attributes.image_url" :src="item.attributes.image_url" class="list-item__image"/>
      <span v-else class="list-item__image-placeholder">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3ZM5 19V5H19L19.002 19H5Z" />
          <path d="M10 14L9 13L6 17H18L13 10L10 14Z" fill="#2E3A59"/>
          <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
        </svg>
      </span>
      <div class="ml-3">
        <div class="list-item__title">{{ item.attributes.title ? item.attributes.title : $t('idea.noTitle') }}</div>
        <div class="list-item__description">{{ item.attributes.intro ? item.attributes.intro : $t('idea.noDescription') }}</div>
        <div class="list-item__status">{{ ideaStatusText }}</div>
      </div>
    </div>
    <div class="list-item__actions">
      <button :aria-label="$t('text.edit')" class="btn" type="button" @click="$emit('edit', item)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9833 5.48122L3.66957 16.7949L3.42466 19.4889C3.36812 20.1109 3.88915 20.6319 4.51109 20.5754L7.2051 20.3304L18.5188 9.01675L14.9833 5.48122Z" fill="#2E3A59"/>
          <path d="M19.2259 8.30964L21.3472 6.18831C21.7378 5.79778 21.7378 5.16462 21.3472 4.77409L19.2259 2.65277C18.8354 2.26225 18.2022 2.26225 17.8117 2.65277L15.6904 4.77411L19.2259 8.30964Z" fill="#2E3A59"/>
        </svg>
      </button>
      <button type="button" :aria-label="$t('text.delete')" class="btn" @click="$emit('delete', item)">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 2H9C7.897 2 7 2.897 7 4V5H3V7H5V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V7H21V5H17V4C17 2.897 16.103 2 15 2ZM9 4H15V5H9V4ZM17 20H7V7H17V20Z"/>
          <path d="M9 9H11V18H9V9Z"/>
          <path d="M13 9H15V18H13V9Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItemLine",

  props: {
    item: Object,
  },

  computed: {
    ideaStatusText(){
      return this.item.attributes.is_published ? this.$t('idea.published') : this.$t('idea.notPublished')
    }
  }
}
</script>

<style lang="scss" scoped>
// list-item-list
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius-base);
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  background-color: #FFF;
  margin-bottom: 0.5rem;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;

  .list-item__image{
    object-fit: cover;
    border-radius: 0.75rem;
    width: 60px; height: 80px;
    border: none;
  }

  .list-item__image-placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--border-color);
    border-radius: 0.75rem;
    width: 60px; height: 80px;
    border: none;
    svg{
      fill: currentColor;
    }
  }

  .list-item__title{
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  &:last-child {
    margin-bottom: 0;
    border: none;
  }
}

// list-item-list__wrap
.list-item__content {
  display: flex;

}

// list-item-list__description
.lild {
  display: flex;
}

// list-item-list__actions
.lila {
}

</style>
