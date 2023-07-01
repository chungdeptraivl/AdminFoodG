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
      <v-btn  icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn color="error" @click.prevent="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Nguyen Thanh Chung</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
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
          icon: 'mdi-text-box-multiple',
          title: 'Product Manager',
          to: '/productDashboard',
        },
        {
          icon: 'mdi-pencil-box-multiple',
          title: 'Product History Manager',
          to: '/productEditHistory',
        },
        {
          icon: 'mdi-shape',
          title: 'Category Manager',
          to: '/categoryDashboard',
        },
        {
          icon: 'mdi-file',
          title: 'Invoice Manager',
          to: '/invoiceDashboard',
        },
        {
          icon: 'mdi-tag',
          title: 'Discount Manager',
          to: '/discountDashboard',
        },
        {
          icon: 'mdi-map-marker',
          title: 'Province Manager',
          to: '/provinceDashboard',
        },
        {
          icon: 'mdi-face-agent',
          title: 'Customer Manager',
          to: '/customerDashboard',
        },
        {
          icon: 'mdi-account',
          title: 'Employee Manager',
          to: '/employeeDashboard',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },

  mounted() {
    this.loading()
  },

  methods: {
    async logout() {
      const res = await this.$axios.$get(`/api/logout`)
      // eslint-disable-next-line no-console
      console.log(res)

      

      this.$router.push('/')
    },

    async loading() {
      try {
        const response = await this.$axios.get(`/api/checkLogin`)
        // eslint-disable-next-line no-console
        console.log(response)
        if (response.data === 'chua_dang_nhap') {
          // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
          this.$router.push('/')
        }
      } catch (e) {
        // Xử lý lỗi
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
}
</script>
