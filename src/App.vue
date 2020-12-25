<template>
  <v-app>
    <!-- Render Navbar -->
    <Navbar></Navbar>

    <v-main>
      <!-- Search Bar -->
      <v-card
          class="mx-auto"
          max-width="700"
          style="margin-top: 20px; margin-bottom: 20px"
      >
        <v-toolbar flat>
          <v-text-field
              hide-details
              prepend-icon="mdi-magnify"
              single-line
              label="Enter a city"
              v-model="curCity"
              @click:prepend="updateCurWeather"
              @keyup.enter="updateCurWeather"
          />
        </v-toolbar>
      </v-card>

      <!-- Render WeatherDescription components -->
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

      <!-- Render saved cities modules -->
      <div v-for="(weather, index) in savedWeather" :key="index">
        <WeatherDescription
            @savecity="saveCity"
            @deletecity="deleteCity"
            :weather="weather"
            :is-saved="true"
        />
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
    curCity: 'Innopolis',
    savedCities: null,
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
      if (!this.savedCities.includes(city)) this.savedCities.push(city);
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
    updateCurWeather() {
      this.$store.dispatch('updateCurWeather', this.curCity);
    },
    updateSavedWeather() {
      this.$store.dispatch('updateSavedWeather', this.savedCities);
    },
  },

  created() {
    // Load cities from local storage
    this.savedCities = localStorage.getItem('savedCities')
        ? JSON.parse(localStorage.getItem('savedCities'))
        : [];

    this.updateCurWeather();
    this.updateSavedWeather();
  },
};
</script>
