<template>
    <v-app id="inspire">
      <v-app-bar app color="dark" flat>
        <logo-admin />
  
        <v-tabs centered class="ml-n9" color="grey darken-1">
          <v-tab v-for="(link, i) in links" :key="i" :to="link.to">
            {{ link.title }}
          </v-tab>
        </v-tabs>
  
        <v-btn text color="success" to="/loginForm">Log In</v-btn>
        <v-btn text color="warning" to="signUpForm">Sign Up</v-btn>
      </v-app-bar>
  
      <v-main class="grey dark-3">
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
  import LogoAdmin from '../components/LogoAdmin.vue'
  export default {
    components: {
      LogoAdmin,
    },
    data: () => ({
      links: [
        {
          title: 'Home',
          to: '/',
        },
        {
          title: 'Introduct',
          to: '/introductPage',
        },
        {
          title: 'Contact',
          to: '/contactPage',
        },
        {
          title: 'About',
          to: '/aboutPage',
        },
      ],
    }),
  }
  </script>
  