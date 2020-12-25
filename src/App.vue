<template>
  <v-app>
    <!-- Render Navbar -->
    <Navbar></Navbar>

    <v-main>
      <!-- Search Bar -->
      <v-card
          class="mx-auto"
      >
        <v-toolbar flat>
          <v-text-field
              hide-details
              prepend-icon="mdi-magnify"
              append-icon="mdi-crosshairs-gps"
              single-line
              label="Enter a city"
              v-model="curCity"
              @click:prepend="updateCurWeather"
              @keyup.enter="updateCurWeather"
              @click:append="updateCurLocWeather"
          />
        </v-toolbar>
      </v-card>

      <!-- Render weather if loaded -->
      <div v-if="curWeather">
        <!-- Render weather by city or by current coordinates -->
        <WeatherDescription
            v-if="curWeather !== 'error'"
            @savecity="saveCity"
            @deletecity="deleteCity"
            :weather="curWeather"
            :is-saved="false"
        />
        <ErrorMessage
            v-else
            :city="curCity"
        />
      </div>

      <!-- Render if saved weather is loaded -->
      <div v-if="savedWeather">
        <!-- Divider for saved cities -->
        <v-card
            v-if="savedCities.length > 0"
            flat
            class="mx-auto"
        >
          <div class="font-weight-black">
            Saved Cities
          </div>
          <v-divider></v-divider>
        </v-card>

        <!-- Render saved cities -->
        <div v-for="(weather, index) in savedWeather" :key="index">
          <WeatherDescription
              @savecity="saveCity"
              @deletecity="deleteCity"
              :weather="weather"
              :is-saved="true"
          />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex';

import Navbar from '@/components/Navbar';
import WeatherDescription from '@/components/WeatherDescription';
import ErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'App',

  components: {
    ErrorMessage,
    WeatherDescription,
    Navbar,
  },

  data: () => ({
    curCity: '',
    savedCities: [],
  }),

  computed: {
    ...mapState({
      curWeather: s => s.weather.curWeather,
      savedWeather: s => s.weather.savedWeather,
    }),
  },

  methods: {
    // Save city to the list of favourites
    saveCity(city) {
      if (this.savedCities.includes(city)) return;

      this.savedCities.push(city);
      localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
      this.updateSavedWeather();
    },
    // Delete city from the list of favourites
    deleteCity(city) {
      const index = this.savedCities.indexOf(city);
      this.savedCities.splice(index, 1);
      localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
      this.updateSavedWeather();
    },
    // Functions for store actions
    updateCurWeather() {
      this.$store.dispatch('updateCurWeather', this.curCity);
    },
    updateSavedWeather() {
      this.$store.dispatch('updateSavedWeather', this.savedCities);
    },
    updateCurLocWeather() {
      this.$store.dispatch('updateCurLocWeather');
    }
  },

  created() {
    // Load cities from local storage
    this.savedCities = localStorage.getItem('savedCities')
        ? JSON.parse(localStorage.getItem('savedCities'))
        : [];

    // Get initial weather by coordinates
    this.updateCurLocWeather();
    // Get weather from the list of saved cities
    this.updateSavedWeather();
  },
};
</script>

<style scoped>
.v-card {
  max-width: 700px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
