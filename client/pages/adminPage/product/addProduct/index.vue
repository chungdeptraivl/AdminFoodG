<template>
  <v-container>
    <h1 style="text-align: center">Add Product</h1>
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
                    (v && v.length >= 10) ||
                    'Description must be at least 10 characters',
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
                :src="
                  form.img
                    ? form.img
                    : 'https://t4.ftcdn.net/jpg/04/75/01/23/240_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg'
                "
                alt="form.name"
                label="Image"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" @click.prevent="addProduct()"
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

        createdBy: 2,

        updatedBy: 2,
        selectedFile: null,
        fileName: null,
      },
    }
  },

  computed: {
    valid() {
      return (
        !!this.form.name &&
        !!this.form.dsc &&
        !!this.form.price &&
        !isNaN(parseFloat(this.form.price)) &&
        isFinite(this.form.price) &&
        this.form.dsc.length >= 10
      )
    },
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

    async addProduct() {
      try {
        const dataForm = new FormData()

        dataForm.append('name', this.form.name)
        dataForm.append('img', this.form.img)
        dataForm.append('dsc', this.form.dsc)
        dataForm.append('price', this.form.price)
        dataForm.append('country', this.form.country)
        dataForm.append('rate', this.form.rate)
        dataForm.append('createdBy', this.form.createdBy)
        dataForm.append('updatedBy', this.form.updatedBy)

        if (this.form.selectedFile) {
          dataForm.append('img', this.form.selectedFile, this.form.fileName)
        }
        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$post(`http://localhost:8080/products`, {
          name: this.form.name,
          dsc: this.form.dsc,
          img: this.form.img,
          price: this.form.price,
          country: this.form.country,
          rate: this.form.rate,
          createdBy: this.form.createdBy,
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
