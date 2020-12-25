<template>
  <v-card
      class="mx-auto"
      max-width="700"
      style="margin-bottom: 20px"
  >
    <!-- City name, current time and short weather description -->
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ cityTitle }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ curTime }} {{ shortDescription }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-container fluid>
      <v-row>
        <v-col>
          <!-- Show weather image -->
          <v-img
              :src="imageLink"
              width="100"
          />
        </v-col>

        <v-col>
          <!-- Show temperature -->
          <WeatherParameter
              name="Temperature"
              :value="temperature"
          />
          <!-- Show how temperature feels like -->
          <WeatherParameter
              name="Feels like"
              :value="feelsLikeTemperature"
          />
        </v-col>

        <v-col>
          <!-- Show wind speed -->
          <WeatherParameter
              name="Wind speed"
              :value="windSpeed"
          />
          <!-- Show wind direction -->
          <WeatherParameter
              name="Wind direction"
              :value="windDirection"
          />
        </v-col>

        <v-col>
          <!-- Show pressure -->
          <WeatherParameter
              name="Pressure"
              :value="pressure"
          />
          <!-- Show humidity -->
          <WeatherParameter
              name="Humidity"
              :value="humidity"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Add city to bookmarks button -->
      <!-- It is red if city in the bookmarks and grey otherwise -->
      <v-btn
          icon
          :color="isSaved ? 'red' : 'grey'"
          v-on="{click: isSaved ? deleteCity : saveCity}"
      >
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {directions, options} from '@/consts';
import WeatherParameter from '@/components/WeatherParameter';

export default {
  name: 'WeatherDescription',

  components: {WeatherParameter},

  props: {
    weather: Object,
    isSaved: Boolean,
  },

  computed: {
    imageLink() {
      const iconId = this.weather?.weather[0].icon;
      return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    },
    cityTitle() {
      const cityName = this.weather?.name;
      const cityCountry = this.weather?.sys.country;
      return `${cityName} ${cityCountry}`;
    },
    shortDescription() {
      return this.weather?.weather[0].description;
    },
    curTime: () => {
      return new Date().toLocaleString('en-GB', options);
    },
    temperature() {
      return `${this.weather?.main.temp} °C`;
    },
    feelsLikeTemperature() {
      return `${this.weather?.main.feels_like} °C`;
    },
    windSpeed() {
      return `${this.weather?.wind.speed} m/s`;
    },
    windDirection() {
      const degrees = this.weather?.wind.deg;
      return `${this.getWindDirection(degrees)}`;
    },
    pressure() {
      return `${this.weather?.main.pressure} Pa`;
    },
    humidity() {
      return `${this.weather?.main.humidity}%`;
    },
  },

  methods: {
    // Calculate wind direction based on meteorological degrees
    getWindDirection(degree) {
      const index = Math.round((degree % 360) / 22.5);
      return directions[index];
    },
    // Action to save the city to the list of favourites
    saveCity() {
      this.$emit('savecity', this.weather?.name);
    },
    // Action to delete the city from the list of favourites
    deleteCity() {
      this.$emit('deletecity', this.weather?.name);
    }
  }
};
</script>

<style scoped>

</style>