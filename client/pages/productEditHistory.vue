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
      <template slot="item.newValue.img" slot-scope="{ item }">
        <v-img
          :src="item.newValue.img"
          :alt="item.newValue.name"
          width="50"
          height="50"
        ></v-img>
      </template>
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
          Refresh
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
export default {
  data() {
    return {
      search: '',
      id: '',
      name: '',
      img: '',
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
        { text: 'Name', value: 'newValue.name' },
        { text: 'Image', value: 'newValue.img', sortable: false },
        { text: 'Description', value: 'newValue.dsc', sortable: false },
        { text: 'Price', value: 'newValue.price' },
        { text: 'Country', value: 'newValue.country', sortable: false },
        { text: 'Rate', value: 'newValue.rate' },
        { text: 'Created By', value: 'newValue.createdBy' },
        { text: 'Update By', value: 'newValue.updatedBy' },
        { text: 'Created Date', value: 'createdDate' },
        { text: 'Action', value: 'restore', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getProducts()
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
          product.newValue = JSON.parse(product.newValue)
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
        this.$toast.global.mySuccess()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        this.$toast.global.myError()
      }
    },

    async updateProduct(product) {
      try {
        const createdAt = new Date(product.newValue.createdAt)
        const updatedAt = new Date(product.newValue.updatedAt)

        const data = {
          id: product.productId,
          name: product.newValue.name,
          img: product.newValue.img,
          dsc: product.newValue.dsc,
          price: product.newValue.price,
          country: product.newValue.country,
          rate: product.newValue.rate,
          createdBy: product.newValue.createdBy,
          createdAt: createdAt.toISOString(),
          updatedBy: product.newValue.updatedBy,
          updatedAt: updatedAt.toISOString(),
        }

        const response = await this.$axios.$put(
          `http://localhost:8080/products`,
          data
        )

        // eslint-disable-next-line no-console
        console.log(response)
        this.$toast.global.mySuccess()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.$toast.global.myError()
      }
    },
  },
}
</script>
