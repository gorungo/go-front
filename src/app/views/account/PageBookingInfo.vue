<template>
  <div id="PageProfileMain">
    <account-booking-info />
  </div>
</template>

<script>

import AccountBookingInfo from "@/app/components/account/AccountBookingInfo";

export default {
  name: "PageProfileMain",
  components: {AccountBookingInfo},
  metaInfo() {
    return {
      title: this.$t('meta.titles.AccountBookingInfo'),
    }
  },
}

</script>

<style lang="scss">

.account{
}
</style>
