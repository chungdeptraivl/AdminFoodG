<template>
  <div>
    <h1 class="mt-3 mb-6">Dashboard Statistics</h1>
    <v-row>
      <v-col cols="12" md="9">
        <v-row>
          <viewer-profile :customer-count="customerCount" />
          <viewer-product :product-count="productCount" />
          <viewer-category :category-count="categoryCount" />
          <viewer-invoice :invoice-count="invoiceCount" />
        </v-row>
        <v-row>
          <v-card style="width: 100%; max-height: 450px">
            <v-card-title> Number of sales per day by type </v-card-title>
            <iframe
              src="http://127.0.0.1:5500/client/components/ChartCategory.html"
              style="width: 100%; height: 400px"
              frameborder="0"
            ></iframe>
          </v-card>
        </v-row>
      </v-col>

      <v-col cols="12" md="3">
        <v-row>
          <viewer-user-admin />
        </v-row>
        <div class="my-6"></div>
        <v-row>
          <v-card
            class="ml-6 scroll"
            style="width: 100%; max-height: 450px; overflow-y: scroll"
          >
            <viewer-user-orther />
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ViewerCategory from '../../components/ViewerCategory.vue'
import ViewerInvoice from '../../components/ViewerInvoice.vue'
import ViewerProduct from '../../components/ViewerProduct.vue'
import ViewerProfile from '../../components/ViewerProfile.vue'
import ViewerUserAdmin from '../../components/ViewerUserAdmin.vue'
import ViewerUserOrther from '../../components/ViewerUserOrther.vue'
export default {
  components: {
    ViewerProfile,
    ViewerProduct,
    ViewerCategory,
    ViewerInvoice,
    ViewerUserAdmin,
    ViewerUserOrther,
  },

  data() {
    return {
      customerCount: 0,
      productCount: 0,
      categoryCount: 0,
      invoiceCount: 0,
    }
  },

  mounted() {
    this.getCustomers()
    this.getProducts()
    this.getCategories()
    this.getInvoices()
    this.checkLogin() // Kiểm tra đăng nhập khi trang được tải lên
  },

  created() {},

  methods: {
    async getCustomers() {
      try {
        const response = await this.$axios.$get(`api/customers`)
        // eslint-disable-next-line no-console
        console.log(response.data.length)
        this.customerCount = response.data.length
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    async getProducts() {
      try {
        const response = await this.$axios.$get(`api/products`)
        // eslint-disable-next-line no-console
        console.log(response.data.length)
        this.productCount = response.data.length
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    async getCategories() {
      try {
        const response = await this.$axios.$get(`api/categories`)
        // eslint-disable-next-line no-console
        console.log(response.data.length)
        this.categoryCount = response.data.length
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    async getInvoices() {
      try {
        const response = await this.$axios.$get(`api/invoices`)
        // eslint-disable-next-line no-console
        console.log(response.data.length)
        this.invoiceCount = response.data.length
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async checkLogin() {
      try {
        const response = await this.$axios.get(`/api/checkLogin`)
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

<style scoped>
.scroll {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* Cho phép cuộn mượt trên các thiết bị cảm ứng */
  scrollbar-width: none; /* Ẩn thanh cuộn trên Firefox */
}

.scroll::-webkit-scrollbar {
  display: none; /* Ẩn thanh cuộn trên Chrome và Safari */
}
</style>
