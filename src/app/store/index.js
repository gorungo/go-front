import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import App from './modules/App';
import Filters from './modules/Filters';
import Idea from './modules/Idea';
import Home from './modules/Home';
import IdeaListing from './modules/IdeaListing';
import OfficeIdeaListing from './modules/OfficeIdeaListing';
import IdeaShow from './modules/IdeaShow';
import AccountProfile from './modules/Account/AccountProfile';
import Currency from './modules/Currency';

export default new Vuex.Store({
  modules:{
    App,
    Filters,
    Home,
    Idea,
    IdeaListing,
    OfficeIdeaListing,
    IdeaShow,
    AccountProfile,
    Currency
  },
});
