<template>
  <v-card
      style="text-align: center"
      flat
  >
    <div class="font-weight-medium">{{ name }}</div>
    <div> {{ value }}</div>
  </v-card>
</template>

<script>
export default {
  name: 'WeatherParameter',
  props: {
    name: String,
    value: String,
  }
};
</script>

<style scoped>

</style>