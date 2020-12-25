import apiClient from '@/store/ApiClient.js';

async function getWeather(city) {
  return apiClient
    .get(`/weather?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
}

export const state = {
  savedWeather: null,
  curWeather: null,
};

export const mutations = {
  SET_SAVED_WEATHER(state, savedWeather) {
    state.savedWeather = savedWeather;
  },
  SET_CUR_WEATHER(state, curWeather) {
    state.curWeather = curWeather;
  }
};

export const actions = {
  updateSavedWeather({commit}, savedCities) {
    const savedWeather = {};
    return Promise.all(savedCities.map(city => getWeather(city)
      .then(response => savedWeather[city] = response.data)))
      .then(() => commit('SET_SAVED_WEATHER', savedWeather));
  },
  updateCurWeather({commit}, city) {
    return getWeather(city)
      .then(response => commit('SET_CUR_WEATHER', response.data))
      .catch(error => {
        console.log(error);
        commit('SET_CUR_WEATHER', 'error')
      });
  }
};
