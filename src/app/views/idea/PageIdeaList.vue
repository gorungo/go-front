<template>
  <div id="IdeasListPage">
    <div class="container-100 mt-2">
      <category-selector />
    </div>
    <idea-list />
  </div>
</template>

<script>
import IdeaList from "@/app/components/idea/IdeaList"
import CategorySelector from "@/app/components/app/CategorySelector"

export default {
  name: "PageIdeaList",
  components: {IdeaList, CategorySelector},
}

</script>

<style lang="scss">

</style>
