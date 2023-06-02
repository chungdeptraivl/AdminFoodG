<template>
  <v-container>
    <h1 style="text-align: center">Add Invoice</h1>
    <v-card class="mt-6">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.customerId"
                label="Name"
              ></v-text-field>

              <v-text-field
                v-model="form.invoiceDate"
                label="Price"
              ></v-text-field>
              <v-text-field v-model="form.tax" label="Country"> </v-text-field>
              <v-text-field v-model="form.grandTotal" label="Country">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.invoiceNumber"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model="form.totalAmount"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model="form.idDiscount"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model="form.status"
                label="Description"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.prevent="addInvoice()">Save</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" to="/inviceDashboard">Back InvoiceTable</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})
export default {
  data() {
    return {
      form: {
        name: '',
        img: '',
        dsc: '',
        price: 0,
        country: '',
        rate: '',

        createdBy: 2,

        updatedBy: 2,
      },
    }
  },

  methods: {
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

        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$post(`http://localhost:8080/invoices`, {
          name: this.form.name,
          dsc: this.form.dsc,
          img: this.form.img,
          price: this.form.price,
          country: this.form.country,
          rate: this.form.rate,
          createdBy: this.form.createdBy,
          updatedBy: this.form.updatedBy,
        })

        this.$toast.success('Successfully added to invoice', {
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

        this.$router.push('/invoiceDashboard')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.response.data)

        this.$toast.error('Add to invoice failed', {
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
