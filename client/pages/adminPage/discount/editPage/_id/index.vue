<template>
  <v-container>
    <h1 style="text-align: center">Edit Discount</h1>
    <v-card class="mt-6">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.code"
                class="mb-6"
                label="Code"
                required
                :rules="[
                  (v) => !!v || 'Code is required',
                  (v) => !/\s/.test(v) || 'Code cannot contain whitespace',
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.isActive"
                :items="[
                  { text: 'Available', value: true },
                  { text: 'Unavailable', value: false },
                ]"
                item-text="text"
                item-value="value"
                label="Active"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.percentage"
                class="mb-6"
                label="Percentage"
                required
                :rules="[
                  (v) => !!v || 'Percentage is required',
                  (v) =>
                    (/^\d+$/.test(v) && Number(v) >= 0 && Number(v) <= 100) ||
                    'Format must be integer between 0 and 100',
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.maxDiscountPrice"
                class="mb-6"
                label="Max Discount Price"
                required
                :rules="[
                  (v) => !!v || 'Max Discount Price is required',
                  (v) =>
                    (/^\d+(\.\d+)?$/.test(v) &&
                      Number(v) >= 0 &&
                      Number(v) <= 1000) ||
                    'Invalid Max Discount Price format',
                ]"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="6">
              <v-text-field
                v-model="form.minAmount"
                class="mb-6"
                label="Min Amount"
                required
                :rules="[
                  (v) => !!v || 'Min Amount is required',
                  (v) =>
                    (/^\d+(\.\d+)?$/.test(v) && Number(v) >= 0) ||
                    'Invalid Min Amount format',
                ]"
              ></v-text-field>
            </v-col> -->
            <!-- <v-col cols="12" md="6">
              <v-text-field
                v-model="form.maxAmount"
                class="mb-6"
                label="Max Amount"
                required
                :rules="[
                  (v) => !!v || 'Max Amount is required',
                  (v) =>
                    (/^\d+(\.\d+)?$/.test(v) && Number(v) <= 1000) ||
                    'Invalid Max Amount format',
                ]"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.startDate"
                class="mb-6"
                label="Start Date"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.endDate"
                class="mb-6"
                label="End Date"
                type="date"
                required
                :rules="[
                  (v) => !!v || 'End Date is required',
                  (v) => !!form.startDate || 'Start Date is required',
                  (v) =>
                    v >= form.startDate || 'End Date must be after Start Date',
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" to="/discountDashboard"
          >Back DiscountTable</v-btn
        >
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          :disabled="!valid"
          @click.prevent="saveDiscount(discount.data.id)"
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
      form: {
        code: '',
        maxDiscountPrice: '',
        // minAmount: '',
        percentage: '',
        endDate: '',
        // maxAmount: '',
        startDate: '',
        isActive: '',
        deletedBy: '',
        createdBy: 2,
        updatedBy: 2,
      },
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('discount/fetchDiscountById', params.id)
  },

  computed: {
    discount() {
      return this.$store.state.discount.item
    },
    valid() {
      return (
        !!this.form.code &&
        !!this.form.maxDiscountPrice &&
        // !!this.form.minAmount &&
        // !!this.form.maxAmount &&
        !!this.form.percentage &&
        !!this.form.startDate &&
        !!this.form.endDate
      )
    },
  },

  created() {
    this.form.id = this.discount.data.id
    this.form.code = this.discount.data.code
    this.form.maxDiscountPrice = this.discount.data.maxDiscountPrice
    // this.form.minAmount = this.discount.data.minAmount
    this.form.percentage = this.discount.data.percentage
    this.form.endDate = this.discount.data.endDate
    // this.form.maxAmount = this.discount.data.maxAmount
    this.form.startDate = this.discount.data.startDate
    this.form.isActive = this.discount.data.isActive
    this.form.deletedBy = this.discount.data.deletedBy
    this.form.createdBy = this.discount.data.createdBy
    this.form.updatedBy = this.discount.data.updatedBy
  },

  methods: {
    async saveDiscount(id) {
      if (
        this.form.maxDiscountPrice < 0 ||
        // this.form.maxAmount < 0 ||
        // this.form.minAmount < 0 ||
        this.form.percentage < 0
      ) {
        this.$toast.error('Edit discount failed check again validation')
      } else {
        try {
          await this.$axios.$put(`http://localhost:8080/discounts`, {
            id: this.form.id,
            code: this.form.code,
            maxDiscountPrice: this.form.maxDiscountPrice,
            // minAmount: this.form.minAmount,
            percentage: this.form.percentage,
            endDate: this.form.endDate,
            // maxAmount: this.form.maxAmount,
            startDate: this.form.startDate,
            isActive: this.form.isActive,
            deletedBy: this.form.deletedBy,
            createdBy: this.form.createdBy,
            updatedBy: this.form.updatedBy,
          })

          this.$toast.success('Successfully edited in discount', {
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

          this.$router.push('/discountDashboard')
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
