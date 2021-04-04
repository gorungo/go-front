<template>
  <div id="profile-editor" class="profile_container">
    <div class="profile">
      <h1>Профиль</h1>
      <div class="profile_layout mt-2">
        <aside class="profile__sidebar">
          <router-link :to="{name:'profileMain'}">{{$t('profile.sectionMain')}}</router-link>
          <router-link :to="{name:'profilePassword'}">{{$t('profile.sectionPassword')}}</router-link>
        </aside>
        <main class="profile__main">
          <router-view />
        </main>
      </div>
    </div>
  </div>

</template>

<script>

export default {

  name: "Profile",

  components: {
  },

  data() {
    return {
      //
    }
  },

  computed: {
    //
  },

  methods: {
    //
  }
}
</script>

<style scoped lang="scss">
.profile_container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.profile{
  .profile_layout{
    display: flex;
    width: 600px;
  }
  .profile__sidebar{
    display: flex;
    flex-direction: column;
    width: 200px;
  }
  .profile__main{
    width: 400px;
  }
}
</style>
