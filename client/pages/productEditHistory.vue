<template>
  <v-card>
    <v-card-title>
      Edit History Table
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
      :items="products"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <template slot="item.action" slot-scope="{ item }">
        <v-chip :color="getColor(item.action)" dark>
          {{ item.action }}
        </v-chip>
      </template>
      <!-- <template slot="item.oldValue.img" slot-scope="{ item }">
        <v-img
          :src="item.oldValue.img"
          :alt="item.oldValue.name"
          width="50"
          height="50"
        ></v-img>
      </template> -->
      <template slot="item.restore" slot-scope="{ item }">
        <v-btn
          v-if="item.action === 'DELETE'"
          color="success"
          @click="restoreProduct(item)"
        >
          Restore
        </v-btn>
        <v-btn
          v-else-if="item.action === 'UPDATE'"
          color="indigo"
          @click="updateProduct(item)"
        >
          Rechange
        </v-btn>
        <v-btn v-else color="deep-orange" @click="noAction"> No Action </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="openNoAction" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm No Action</v-card-title>
        <v-card-text> This is the Create Product, can't restore </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="openNoAction = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      id: '',
      name: '',
      // img: '',
      dsc: '',
      price: '',
      country: '',
      rate: '',
      createdAt: '',
      createdBy: '',
      updatedAt: '',
      updatedBy: '',
      products: [],
      loading: true,
      openNoAction: false,
      headers: [
        { text: 'Status', value: 'action' },
        { text: 'Name', value: 'oldValue.name' },
        // { text: 'Image', value: 'oldValue.img', sortable: false },
        { text: 'Description', value: 'oldValue.dsc', sortable: false },
        { text: 'Price', value: 'oldValue.price' },
        { text: 'Country', value: 'oldValue.country', sortable: false },
        { text: 'Rate', value: 'oldValue.rate' },
        { text: 'Created By', value: 'oldValue.createdBy' },
        { text: 'Update By', value: 'oldValue.updatedBy' },
        { text: 'Created Date', value: 'createdDate' },
        { text: 'Action', value: 'restore', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getProducts()
    this.checkLogin()
  },

  methods: {
    getColor(action) {
      switch (action) {
        case 'CREATE':
          return 'green'
        case 'DELETE':
          return 'red'
        case 'UPDATE':
          return 'orange'
        default:
          return 'gray'
      }
    },

    noAction() {
      this.openNoAction = true
    },

    async getProducts() {
      try {
        const response = await this.$axios.$get(`/api/products/edit-history`)
        response.data.forEach((product) => {
          product.oldValue = JSON.parse(product.oldValue)
          product.createdDate = new Date(product.createdDate)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.products = response.data

        // eslint-disable-next-line no-console
        console.log(response.data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async restoreProduct(item) {
      try {
        const response = await this.$axios.$put(
          `/api/products/restore/${item.productId}/2`
        )
        // eslint-disable-next-line no-console
        console.log(response)
        this.getProducts()

        this.$toast.success('Restore successfully, check product manager', {
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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.$toast.error('Opp!!! Something was wrong', {
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
      }
    },

    async updateProduct(product) {
      try {
        const createdAt = new Date(product.oldValue.createdAt)
        const updatedAt = new Date(product.oldValue.updatedAt)

        const data = {
          id: product.productId,
          name: product.oldValue.name,
          // img: product.oldValue.img,
          dsc: product.oldValue.dsc,
          price: product.oldValue.price,
          country: product.oldValue.country,
          rate: product.oldValue.rate,
          createdBy: product.oldValue.createdBy,
          createdAt: createdAt.toISOString(),
          updatedBy: product.oldValue.updatedBy,
          updatedAt: updatedAt.toISOString(),
        }

        const response = await this.$axios.$put(
          `http://localhost:8080/products`,
          data
        )

        this.$toast.success('Rechange successfully, check product manager', {
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

        // eslint-disable-next-line no-console
        console.log(response)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)

        this.$toast.error('Opp!!! Something was wrong', {
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
