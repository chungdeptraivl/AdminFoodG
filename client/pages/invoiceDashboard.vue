<template>
  <v-card>
    <v-card-title>
      Invoice Table
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
      :items="invoices"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <template slot="item.delete" slot-scope="{ item }">
        <v-btn color="error" @click="openDelete(item.id)"> Delete </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialogVisible" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this invoice?
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="deleteInvoice(id)">Yes</v-btn>
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
      invoices: [],
      loading: true,
      deleteDialogVisible: false,
      headers: [
        { text: 'Customer ID', value: 'customerId' },
        { text: 'Invoice Number', value: 'invoiceNumber' },
        { text: 'Invoice Date', value: 'invoiceDate' },
        { text: 'Total Amount', value: 'totalAmount' },
        { text: 'Tax', value: 'tax' },
        { text: 'Discount', value: 'idDiscount' },
        { text: 'Grand Total', value: 'grandTotal' },
        { text: 'Status', value: 'status' },
        { text: 'ID OnePayResponse', value: 'idOnePayResponse' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Paid', value: 'paid' },
        { text: 'Paid Date', value: 'paidDate' },
        { text: 'Edit', value: 'edit', align: 'center', sortable: false },
        { text: 'Delete', value: 'delete', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getInvoices()
    this.checkLogin()
  },

  methods: {
    async getInvoices() {
      try {
        const response = await this.$axios.$get(`/api/invoices`)

        response.data.forEach((invoice) => {
          invoice.invoiceDate = new Date(invoice.invoiceDate)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          invoice.createdAt = new Date(invoice.createdAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          invoice.paidDate = new Date(invoice.paidDate)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          invoice.updatedAt = new Date(invoice.updatedAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.invoices = response.data

        // eslint-disable-next-line no-console
        console.log(this.invoices)
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

    async deleteInvoice(id) {
      try {
        await this.$axios.$delete(`http://localhost:8080/invoices/${id}`)
        this.deleteDialogVisible = false
        this.getInvoices()

        this.$toast.success('Delete done! Check your invoice manager', {
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

        this.$toast.error('Delete failed invoice', {
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
