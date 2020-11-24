<template>
  <div id="AuthMenu" class="auth-menu">
    <template v-if="authenticated">
      <el-dropdown trigger="click">
      <button type="button" class="el-dropdown-link auth-menu__button" aria-label="Меню пользователя">
        <img class="auth-menu__user-image" v-if="user.attributes.imageUrl" :src="user.attributes.imageUrl" />
        <svg v-else class="auth-menu__user-image" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#2E3A59"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9261 20.0557C20.397 18.235 22 15.3047 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.3047 3.60301 18.235 6.07388 20.0557C6.11934 20.0892 6.16509 20.1223 6.21112 20.1551C6.65997 20.4742 7.1363 20.7573 7.63587 21C8.95464 21.6407 10.4354 22 12 22C13.5646 22 15.0454 21.6407 16.3641 21C16.3909 20.987 16.4177 20.9738 16.4443 20.9606C16.9657 20.7015 17.4613 20.3982 17.9261 20.0557ZM17.2287 18.055C18.926 16.588 20 14.4194 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.4194 5.07401 16.588 6.77128 18.055C7.80066 16.2313 9.75654 15 12 15C14.2435 15 16.1993 16.2313 17.2287 18.055ZM15.5567 19.1679C14.8921 17.8803 13.5488 17 12 17C10.4512 17 9.10792 17.8803 8.44332 19.1679C9.51467 19.7005 10.7224 20 12 20C13.2776 20 14.4853 19.7005 15.5567 19.1679Z" fill="#2E3A59"/>
        </svg>
      </button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link :to="{name: 'Profile'}">Action 1</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </template>
    <div v-else>
      <router-link :to="{name: 'SignIn'}" :aria-label="$t('auth.btnSignIn')" class="auth-menu__button">
        {{$t('auth.btnSignIn')}}
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: "AuthMenu",

  computed: {
    ...mapState('App', ['user']),
    ...mapGetters('App', ['authenticated']),
  }
}
</script>

<style scoped lang="scss">
.auth-menu__button{
  text-decoration: none;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  outline: none;
  border: none;
  &:focus{
    box-shadow: 0 0 0 3px var(--focus-color);
  }
  .auth-menu__user-image{
    border: none;
    width: 100%;
    object-fit: cover;
  }
}

</style>
