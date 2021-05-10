<template>
<div class="details__show-contacts">
  <button v-if="!contactsIsVisible" type="button" @click="handleShowContacts" class="details__show-contacts-button">
    {{$t('idea.showContacts')}}
  </button>
  <p v-else>{{contacts ? contacts : $t('idea.noBookingContacts')}}</p>
</div>
</template>

<script>
export default {
  name: "IdeaContacts",
  props: {
    contacts: String,
  },
  data(){
    return {
      contactsIsVisible: false,
    }
  },

  methods: {
    handleShowContacts(){
      this.show()
    },
    show(){
      this.contactsIsVisible = true
    }
  }

}
</script>

<style scoped>
.details__show-contacts-button{
  border: none;
  background: none;
  font-weight: bold;

  border-bottom: 1px dashed #3b3b3b;
  padding: 0;
}

</style>
