<template>
  <nav class="breadcrumbs" v-if="links.length > 0">
    <ol class="breadcrumbs__list">
      <li class="breadcrumbs__list-item" v-for="link in links">
        <router-link :to="link.routerLink">{{link.title}}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    /*
   {
      title: 'title', routerLink: {name: 'name', params ...}
   }
     */
    links: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style scoped>

</style>
