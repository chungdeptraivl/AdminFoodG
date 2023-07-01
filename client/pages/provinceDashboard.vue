<template>
  <v-card>
    <v-card-title>
      Prvince Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="provinces"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <!-- <template slot="item.edit" slot-scope="{ item }">
        <v-btn color="success" :to="`/adminPage/product/editPage/${item.id}`">
          Edit
        </v-btn>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

if (process.browser) {
  Vue.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
  })
}
export default {
  data() {
    return {
      search: '',
      provinces: [],
      loading: true,
      headers: [
        { text: 'Ward', value: 'ward', align: 'start' },
        { text: 'District', value: 'district', align: 'start' },
        { text: 'City', value: 'city', align: 'start' },
        // { text: 'Edit', value: 'edit', align: 'center', sortable: false },
        // { text: 'Delete', value: 'delete', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getProvinces()
    this.checkLogin()
  },

  methods: {
    async getProvinces() {
      try {
        const response = await this.$axios.$get(`/api/provinces`)

        this.provinces = response.data
        // eslint-disable-next-line no-console
        console.log(this.provinces)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async checkLogin() {
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
    },
  },
}
</script>
