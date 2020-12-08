import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import IdeaEditor from './modules/IdeaEditor';

export default new Vuex.Store({
  modules:{
    IdeaEditor
  },
});
