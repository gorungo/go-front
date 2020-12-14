import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import IdeaEditor from './modules/idea-editor';

export default new Vuex.Store({
  modules:{
    IdeaEditor
  },
});
