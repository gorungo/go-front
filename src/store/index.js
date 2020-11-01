import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import App from './modules/App';
import Idea from './modules/Idea';
import Home from './modules/Home';
import IdeaListing from './modules/IdeaListing';
import IdeaShow from './modules/IdeaShow';
import Profile from './modules/Profile';
import Currency from './modules/Currency';

export default new Vuex.Store({
  modules:{
    App,
    Home,
    Idea,
    IdeaListing,
    IdeaShow,
    Profile,
    Currency
  },
});
