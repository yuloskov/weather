<template>
  <!-- Error message for wrong city entered -->
  <v-card
      class="mx-auto"
      max-width="700"
      style="margin-bottom: 20px; color: red; padding: 10px"
  >
   No such city {{city}}
  </v-card>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    city: String
  }
};
</script>

<style scoped>

</style>