<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <logo-admin />
      <hr class="mb-5" />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mb-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app fixed>
      <v-app-bar-nav-icon class="mx-3" @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn color="warning" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/adminPage',
        },
        {
          icon: 'mdi-widgets',
          title: 'Product Manager',
          to: '/productDashboard',
        },
        {
          icon: 'mdi-call-split',
          title: 'Product History Manager',
          to: '/productEditHistory',
        },
        {
          icon: 'mdi-domain',
          title: 'Category Manager',
          to: '/categoryDashboard',
        },
        {
          icon: 'mdi-message-text',
          title: 'Invoice Manager',
          to: '/invoiceDashboard',
        },
        {
          icon: 'mdi-account',
          title: 'Employee Manager',
          to: '/employeeDashboard',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Client Manager',
          to: '/clientDashboard',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },

  methods: {
    ...mapActions('loggedIn', ['logout']),
  },
}
</script>
