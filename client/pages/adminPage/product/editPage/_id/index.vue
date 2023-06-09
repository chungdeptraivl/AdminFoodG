<template>
  <v-container>
    <h1 style="text-align: center">Edit Product</h1>
    <v-card class="mt-6">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="form.name"
                class="mb-6"
                label="Name"
                required
                :rules="[(v) => !!v || 'Name is required']"
                :error-messages="form.name ? [] : ['Name is required']"
              ></v-text-field>
              <v-text-field
                v-model="form.dsc"
                class="mb-6"
                label="Description"
                required
                :rules="[
                  (v) => !!v || 'Description is required',
                  (v) =>
                    (v && v.length >= 3) ||
                    'Description must be at least 3 characters',
                ]"
                :error-messages="form.dsc ? [] : ['Description is required']"
              ></v-text-field>
              <v-text-field
                v-model.number="form.price"
                class="mb-6"
                label="Price"
                type="number"
                required
                :rules="[
                  (v) =>
                    (!isNaN(parseFloat(v)) && isFinite(v)) ||
                    'Price must be a number',
                  (v) => v >= 0 || 'Price must not be negative',
                ]"
                :error-messages="form.price ? [] : ['Price is required']"
              >
              </v-text-field>
              <v-text-field v-model="form.country" label="Country" class="mb-6">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <p>Image</p>
              <input
                style="margin-bottom: 10px"
                type="file"
                @change="onFileChange"
              />
              <img
                style="max-width: 250px"
                :src="form.img ? form.img : product.data.img"
                alt="form.name"
                label="Image"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" to="/productDashboard">Back ProductTable</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!valid"
          @click.prevent="saveProduct(product.data.id)"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
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
      url: null,
      form: {
        name: '',
        img: '',
        dsc: '',
        price: 0,
        country: '',
        rate: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        selectedFile: null,
        fileName: null,
      },
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('product/fetchProductById', params.id)
  },

  computed: {
    product() {
      return this.$store.state.product.item
    },
    valid() {
      return (
        !!this.form.name &&
        !!this.form.dsc &&
        !!this.form.price &&
        !isNaN(parseFloat(this.form.price)) &&
        isFinite(this.form.price) &&
        this.form.dsc.length >= 3
      )
    },
  },

  created() {
    this.form.id = this.product.data.id
    this.form.name = this.product.data.name
    this.form.img = this.product.data.img
    this.form.dsc = this.product.data.dsc
    this.form.price = this.product.data.price
    this.form.country = this.product.data.country
    this.form.rate = this.product.data.rate
    this.form.createdAt = this.product.data.createdAt
    this.form.createdBy = this.product.data.createdBy
    this.form.updatedAt = this.product.data.updatedAt
    this.form.updatedBy = this.product.data.updatedBy
  },

  methods: {
    async onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('image', file)

        try {
          const response = await fetch('https://api.imgur.com/3/image/', {
            method: 'POST',
            headers: {
              Authorization: 'Client-ID 59ab98495609928',
            },
            body: formData,
          })

          const data = await response.json()
          this.form.img = data.data.link
          // eslint-disable-next-line no-console
          console.log(this.form.img)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },

    async saveProduct(id) {
      if (this.form.price < 0) {
        this.$toast.error('Price must not be negative')
      } else {
        // Thực hiện thêm sản phẩm
        try {
          await this.$axios.$put(`http://localhost:8080/products`, {
            id: this.form.id,
            name: this.form.name,
            dsc: this.form.dsc,
            img: this.form.img,
            price: this.form.price,
            country: this.form.country,
            rate: this.form.rate,
            createdBy: this.form.createdBy,
            createdAt: this.form.createdAt,
            updatedAt: this.form.updatedAt,
            updatedBy: this.form.updatedBy,
          })

          this.$toast.success('Successfully edited in product', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })

          this.$router.push('/productDashboard')
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error.response.data)

          this.$toast.error('OOPPP!!! Something was wrong', {
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
      }
    },
  },
}
</script>

<style scoped>
input[type='file'] {
  background-color: #fff;
  color: #000;
  cursor: pointer;
}
</style>
