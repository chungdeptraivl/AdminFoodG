<template>
  <v-app id="inspire">
    <v-main class="wrapper">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  background: linear-gradient(#141e30, #243b55);
}
</style>
