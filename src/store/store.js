import Vue from 'vue';
import Vuex from 'vuex';
import * as weather from '@/store/modules/weather.js';


Vue.use(Vuex);

const devtools = (process.env.NODE_ENV === 'development');

export default new Vuex.Store({
  modules: {
    weather,
  },
  state: {},
  mutations: {},
  actions: {},
  devtools,
});
