<template>
  <div>
    <h1 class="mt-3 mb-6">Dashboard Statistics</h1>
    <v-row>
      <v-col cols="12" md="9">
        <v-row>
          <viewer-profile />
          <viewer-product :product-count="productCount" />
          <viewer-category :category-count="categoryCount" />
          <viewer-invoice />
        </v-row>
        <div class="my-6"></div>
        <v-row>
          <v-card style="width: 100%; height: 400px">
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
            style="width: 100%; max-height: 400px; overflow-y: scroll"
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
      productCount: 0,
      categoryCount: 0,
    }
  },

  mounted() {
    this.getProducts()
    this.getCategories()
  },

  created() {},

  methods: {
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
