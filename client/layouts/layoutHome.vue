<template>
  <v-app id="inspire">
    <v-main class="wrapper">
      <v-container>
        <v-row>
          <!-- <language-select/> -->
          <v-col cols="12" sm="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import LanguageSelect from '../components/LanguageSelect.vue'
export default {
  components: {
    // LanguageSelect
  }
}
</script>

<style scoped>
.wrapper {
  background: linear-gradient(#101520, #203144);
}
</style>
