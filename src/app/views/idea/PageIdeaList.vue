<template>
  <div id="IdeasListPage">
    <category-selector />
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
