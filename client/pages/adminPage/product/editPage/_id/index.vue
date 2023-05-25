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
              ></v-text-field>
              <v-text-field
                v-model="form.dsc"
                class="mb-6"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model.number="form.price"
                class="mb-6"
                label="Price"
              ></v-text-field>
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
        <v-btn color="primary" @click.prevent="saveProduct(product.data.id)"
          >Save</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="success" to="/productDashboard">Back ProductTable</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
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
  },

  created() {
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
    // onFileChange(e) {
    //   const file = e.target.files[0]
    //   if (file) {
    //     const reader = new FileReader()
    //     reader.onload = (event) => {
    //       this.form.img = event.target.result
    //     }
    //     reader.readAsDataURL(file)
    //     this.form.selectedFile = file
    //     this.form.fileName = file.name
    //   }
    // },
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
      try {
        const dataForm = new FormData()

        dataForm.append('id', id)
        dataForm.append('name', this.form.name)
        dataForm.append('img', this.form.img)
        dataForm.append('dsc', this.form.dsc)
        dataForm.append('price', this.form.price)
        dataForm.append('country', this.form.country)
        dataForm.append('rate', this.form.rate)
        dataForm.append('createdBy', this.form.createdBy)
        dataForm.append('createdAt', this.form.createdAt)
        dataForm.append('updatedBy', this.form.updatedBy)
        dataForm.append('updatedAt', this.form.updatedAt)

        // if (this.form.selectedFile) {
        //   dataForm.append('img', this.form.selectedFile, this.form.fileName)
        // }
        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        this.form.id = id
        // eslint-disable-next-line no-console
        console.log(this.form)
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

        this.$toast.global.mySuccess()
        this.$router.push('/productDashboard')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.response.data)
        this.$toast.global.myError()
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
