import apiClient from '@/store/ApiClient.js';

// Make API request by city name
async function getWeatherByCity(city) {
  return apiClient
    .get(`/weather?q=${city}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
}

// Make API request by current coordinates
async function getWeatherByCoords({lat, lon}) {
  return apiClient
    .get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
}

// Get current coordinates
function getCoordinates() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return new Promise((success, error) => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
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
    return Promise.all(savedCities.map(city => getWeatherByCity(city)
      .then(response => savedWeather[city] = response.data)))
      .then(() => commit('SET_SAVED_WEATHER', savedWeather));
  },
  updateCurWeather({commit}, city) {
    return getWeatherByCity(city)
      .then(response => commit('SET_CUR_WEATHER', response.data))
      .catch(error => {
        console.log(error);
        commit('SET_CUR_WEATHER', 'error');
      });
  },
  updateCurLocWeather({commit}) {
    return getCoordinates()
      .then(pos => {
        const crd = pos.coords;
        const lat = crd.latitude.toString();
        const lon = crd.longitude.toString();

        return getWeatherByCoords({lat, lon})
          .then(response => commit('SET_CUR_WEATHER', response.data))
          .catch(error => {
            console.log(error);
            commit('SET_CUR_WEATHER', 'error');
          });
      })
      .catch(error => console.log(error));
  }
};
