<template>
  <v-card>
    <v-card-title>
      Discount Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="adminPage/discount/addDiscount"
        >Add Discount</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="discounts"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <template slot="item.edit" slot-scope="{ item }">
        <v-btn color="success" :to="`/adminPage/discount/editPage/${item.id}`">
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
          Are you sure you want to delete this discount?
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="deleteDiscount(id)">Yes</v-btn>
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
      discounts: [],
      loading: true,
      deleteDialogVisible: false,
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Percentage', value: 'percentage' },
        { text: 'Max Discount Price', value: 'maxDiscountPrice' },
        // { text: 'Min Amount', value: 'minAmount' },
        // { text: 'Max Amount', value: 'maxAmount' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'End Date', value: 'endDate' },
        { text: 'Active', value: 'isActive' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Created By', value: 'createdBy' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Update By', value: 'updatedBy' },
        // { text: 'Delete At', value: 'deletedAt' },
        // { text: 'Delete By', value: 'deletedBy' },
        { text: 'Edit', value: 'edit', align: 'center', sortable: false },
        { text: 'Delete', value: 'delete', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getDiscount()
    this.checkLogin()
  },

  methods: {
    async getDiscount() {
      try {
        const response = await this.$axios.$get(`/api/discounts`)
        response.data.forEach((discount) => {
          discount.createdAt = new Date(discount.createdAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          discount.updatedAt = new Date(discount.updatedAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          // discount.deletedAt = new Date(discount.deletedAt)
          //   .toISOString()
          //   .split('T')
          //   .join(' ')
          //   .split('.')[0]
          discount.startDate = new Date(discount.startDate)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          discount.endDate = new Date(discount.endDate)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.discounts = response.data
        // eslint-disable-next-line no-console
        console.log(this.discounts)
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

    async deleteDiscount(id) {
      try {
        await this.$axios.$delete(`http://localhost:8080/discounts/${id}`)
        this.deleteDialogVisible = false
        this.getDiscount()

        this.$toast.success('Delete done! Check your discount manager', {
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

        this.$toast.error('Delete failed discount', {
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
