<template>
  <v-card>
    <v-card-title>
      Product Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="adminPage/product/addProduct"
        >Add Product</v-btn
      >
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
      <template slot="item.img" slot-scope="{ item }">
        <v-img :src="item.img" :alt="item.name" width="50" height="50"></v-img>
      </template>
      <template slot="item.edit" slot-scope="{ item }">
        <v-btn color="success" :to="`/adminPage/product/editPage/${item.id}`">
          Edit
        </v-btn>
      </template>
      <template slot="item.delete" slot-scope="{ item }">
        <v-btn color="error" @click="openDelete(item.id)"> Delete </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialogVisible" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="deleteProduct(id)">Yes</v-btn>
          <v-btn color="error" text @click="deleteDialogVisible = false"
            >No</v-btn
          >
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
      products: [],
      loading: true,
      deleteDialogVisible: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Image', value: 'img', sortable: false },
        { text: 'Description', value: 'dsc', sortable: false },
        { text: 'Price', value: 'price' },
        { text: 'Country', value: 'country', sortable: false },
        { text: 'Rate', value: 'rate' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Created By', value: 'createdBy' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Update By', value: 'updatedBy' },
        { text: 'Edit', value: 'edit', align: 'center', sortable: false },
        { text: 'Delete', value: 'delete', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    async getProducts() {
      try {
        const response = await this.$axios.$get(`/api/products`)
        response.data.forEach((product) => {
          product.createdAt = new Date(product.createdAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          product.updatedAt = new Date(product.updatedAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.products = response.data
        // eslint-disable-next-line no-console
        console.log(this.products)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    openDelete(id) {
      this.deleteDialogVisible = true
      this.id = id
    },

    async deleteProduct(id) {
      try {
        await this.$axios.$delete(`http://localhost:8080/products/${id}/2`)
        this.deleteDialogVisible = false
        this.getProducts()

        this.$toast.success('Delete done! Check your product manager', {
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
        // eslint-disable-next-line no-console
        console.log(error.response.data)

        this.$toast.error('Delete failed product', {
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
  },
}
</script>
