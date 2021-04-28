<template>
  <el-dialog
      :title="title"
      :visible.sync="modalVisible"
      :fullscreen="fullscreen"
      :width="width" role="dialog"
      tabindex="-1"
      lock-scroll
      @closed="$emit('closed')"
  >
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
import {Dialog} from 'element-ui';

export default {
  name: "AppDialog",
  // eslint-disable-next-line
  components: {Dialog},

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
    fullscreen: {
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
