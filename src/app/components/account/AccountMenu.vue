<template>
  <nav class="account-menu">
    <div class="account-menu__nav">
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'AccountMain'}">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10ZM21 21V20C21 16.141 17.859 13 14 13H10C6.14 13 3 16.141 3 20V21H5V20C5 17.243 7.243 15 10 15H14C16.757 15 19 17.243 19 20V21H21Z" fill="#2E3A59"/>
        </svg>
        <div class="account-menu__item-title">{{$t('account.titles.AccountMain')}}</div>
      </router-link>
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'AccountBookingInfo'}">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM20.1818 12C20.1818 16.5187 16.5187 20.1818 12 20.1818C7.48131 20.1818 3.81818 16.5187 3.81818 12C3.81818 7.48131 7.48131 3.81818 12 3.81818C16.5187 3.81818 20.1818 7.48131 20.1818 12Z" fill="#2E3A59"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 13.2322L15.7929 7.93934L17.2071 9.35355L10.5 16.0607L6.79289 12.3536L8.20711 10.9393L10.5 13.2322Z" fill="#2E3A59"/>
        </svg>
        <div class="account-menu__item-title">{{$t('account.titles.AccountBookingInfo')}}</div>
      </router-link>
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'AccountPassword'}">
        <svg width="30" height="30" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.90039 4.36035L0.246094 3.56934L0.650391 2.24219L3.30469 3.22656L3.22559 0.203125H4.57031L4.48242 3.27051L7.09277 2.30371L7.49707 3.63965L4.79883 4.43945L6.53906 6.82129L5.44922 7.64746L3.81445 5.11621L2.23242 7.58594L1.13379 6.78613L2.90039 4.36035Z" fill="black"/>
          <path d="M10.6523 4.36035L7.99805 3.56934L8.40234 2.24219L11.0566 3.22656L10.9775 0.203125H12.3223L12.2344 3.27051L14.8447 2.30371L15.249 3.63965L12.5508 4.43945L14.291 6.82129L13.2012 7.64746L11.5664 5.11621L9.98438 7.58594L8.88574 6.78613L10.6523 4.36035Z" fill="black"/>
          <path d="M18.4043 4.36035L15.75 3.56934L16.1543 2.24219L18.8086 3.22656L18.7295 0.203125H20.0742L19.9863 3.27051L22.5967 2.30371L23.001 3.63965L20.3027 4.43945L22.043 6.82129L20.9531 7.64746L19.3184 5.11621L17.7363 7.58594L16.6377 6.78613L18.4043 4.36035Z" fill="black"/>
        </svg>
        <div class="account-menu__item-title">{{$t('account.titles.AccountPassword')}}</div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
name: "AccountMenu"
}
</script>

<style scoped lang="scss">

</style>
