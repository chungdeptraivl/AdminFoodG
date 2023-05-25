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
                :src="
                  form.selectedFile
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
        <v-btn color="primary" @click.prevent="addProduct()">Save</v-btn>
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

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.form.img = event.target.result
        }
        reader.readAsDataURL(file)
        this.form.selectedFile = file
        this.form.fileName = file.name
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
