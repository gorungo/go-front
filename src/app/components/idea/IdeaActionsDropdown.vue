<template>
    <div :id="'idea-dropdown-' + idea.hid">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <svg viewBox="0 0 24 24" class="el-dropdown-link__svg-icon" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9497 15.5L7 10.5503L8.41421 9.13604L11.9497 12.6716L15.4853 9.13604L16.8995 10.5503L11.9497 15.5Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"/>
          </svg>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="$emit('edit')">{{$t('itemActions.edit')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
export default {
  name: "IdeaActionsDropdown",

  props: {
    idea: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-link{

  .el-dropdown-link__svg-icon{
    margin: 4px;
    padding: 4px;
    //background-color: rgba(0, 0, 0, 0.3);
    fill: var(--white);
    border-radius: 10px;
    width:32px;
    height:32px;
  }
  .el-dropdown-link__svg-icon:hover{
    margin: 4px;
    padding: 2px;
  }
}
</style>
