<template>
  <div class="">
    <div v-if="userProfile" class="card card-body box-shadow">
      <div class="form-group">
        <label for="booking-info" class="form-group__label">
          {{$t('account.booking.infoTitle')}}
          <p v-if="userProfile.attributes.booking_info" class="text-secondary form-group__label-description">{{$t('account.booking.infoPlaceholder')}}</p>
        </label>
        <textarea id="booking-info" rows="4" class="form-group__input form-control" name="booking_info" @change="handleFormChange" :value="userProfile.attributes.booking_info" :placeholder="$t('account.booking.infoPlaceholder')" required />
      </div>
      <div class="form-group">
        <label for="booking-contacts" class="form-group__label">
          {{$t('account.booking.contactsTitle')}}
          <p v-if="userProfile.attributes.booking_contacts" class="text-secondary form-group__label-description">{{$t('account.booking.contactsPlaceholder')}}</p>
        </label>
        <textarea id="booking-contacts" rows="4" class="form-group__input form-control" name="booking_contacts"  @change="handleFormChange" :value="userProfile.attributes.booking_contacts" :placeholder="$t('account.booking.contactsPlaceholder')" required />
      </div>
      <div class="form-group">
        <label for="booking-whatsapp" class="form-group__label">
          {{$t('account.booking.whatsappTitle')}}
          <p v-if="userProfile.attributes.booking_contacts" class="text-secondary form-group__label-description">{{$t('account.booking.whatsappPlaceholder')}}</p>
        </label>
        <input type="phone" id="booking-whatsapp" class="form-group__input form-control" name="booking_whatsapp"  @change="handleFormChange" :value="userProfile.attributes.booking_whatsapp" :placeholder="$t('account.booking.whatsappMask')" required />
      </div>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "@/app/components/app/Loading"
import {mapActions, mapState} from "vuex"
import {showNotify} from "@/js/notification";
export default {

  name: "AccountBookingInfo",

  components: {
    Loading
  },

  data(){
    return {
      value: [],
      loading: true,
    }
  },
  async mounted() {
    if(!this.userProfile){
      await this.fetchUserProfile()
    }
    this.loading = false
  },
  computed: {
    ...mapState('AccountProfile', ['userProfile']),
    ...mapState('Auth', ['user'])
  },
  methods: {
    ...mapActions('AccountProfile', [
      'fetchUserProfile',
      'setUserProfileField',
    ]),


    handleFormChange(e){
      this.setUserProfileField({
        field: e.target.name,
        value: e.target.value,
      }).then(() => {
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.saveSuccess'),
          type: 'success',
          showClose: true,
        })
      })
    },
  }

}
</script>

<style scoped lang="scss">

</style>
