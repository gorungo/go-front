<template>
  <el-popover
      :title="title"
      :visible.sync="modalVisible"
      :width="width"
      tabindex="-1"
      trigger="click"
      @hide="$emit('hide')"
  >
    <slot></slot>
  </el-popover>
</template>

<script>
import {Dialog} from 'element-ui';

export default {
  name: "AppDialog",
  // eslint-disable-next-line
  components: {Popover},

  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    }
  },

  data(){
    return {
      modalVisible: false,
    }
  },

  mounted(){
    this.modalVisible = this.visible
  },

  watch: {
    visible(val){
      this.modalVisible = val
    },
    modalVisible(val){
      this.$emit('update:visible', val)
    },
  },

  methods: {
    showWindow(){
      this.modalVisible = true;
    },

    hideWindow(){
      this.modalVisible = false;
    }
  }
}
</script>

<style>
  .el-dialog__body{
    padding: 0 !important;
  }

</style>
