<template>
  <v-card>
    <v-card-title>
      Customer Table
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
      :items="customers"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <template slot="item.avartar" slot-scope="{ item }">
        <v-avartar
          :src="item.avartar"
          :alt="item.name"
          width="50"
          height="50"
        ></v-avartar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      customers: [],
      loading: true,
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Avatar', value: 'avatar' },
        { text: 'Fullname', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Birthday At', value: 'birthday' },
        { text: 'Create At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
      ],
    }
  },

  mounted() {
    this.getcustomers()
    this.checkLogin()
  },

  methods: {
    async getcustomers() {
      try {
        const response = await this.$axios.$get(`/api/customers`)
        response.data.forEach((admin) => {
          admin.createdAt = new Date(admin.createdAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          admin.updatedAt = new Date(admin.updatedAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          admin.birthday = new Date(admin.birthday)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.customers = response.data
        // eslint-disable-next-line no-console
        console.log(this.customers)
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

          this.$toast.error('You must login', {
          position: 'top-right',
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: true,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true,
          rtl: false,
        })

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
