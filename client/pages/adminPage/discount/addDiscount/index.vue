<template>
  <v-container>
    <h1 style="text-align: center">Add Discount</h1>
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
                  (v) =>
                    v.length <= 20 ||
                    'Code cannot contain more than 20 characters',
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
                      Number(v) < 1000000) ||
                    'Valid Max Discount Price format must be between 0 - 1000000',
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.minAmount"
                class="mb-6"
                label="Min Amount"
                required
                :rules="[
                  (v) => !!v || 'Min Amount is required',
                  (v) =>
                    (/^\d+(\.\d+)?$/.test(v) &&
                      Number(v) >= 0 &&
                      Number(v) <= 1000000) ||
                    'Valid Min Amount format must be between 0 - 1000000',
                ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.maxAmount"
                class="mb-6"
                label="Max Amount"
                required
                :rules="[
                  (v) => !!v || 'Max Amount is required',
                  (v) =>
                    (/^\d+(\.\d+)?$/.test(v) &&
                      Number(v) > 0 &&
                      Number(v) < 1000000) ||
                    'Valid Max Amount format must be between 0 - 1000000',
                  (v) =>
                    Number(v) > Number(form.minAmount) ||
                    'Max Amount must be greater than Min Amount',
                ]"
              ></v-text-field>
            </v-col>
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
          >Back DiscountDashboard</v-btn
        >
        <v-spacer></v-spacer>

        <v-btn color="primary" :disabled="!valid" @click.prevent="addCategory()"
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
        minAmount: '',
        percentage: '',
        endDate: '',
        maxAmount: '',
        startDate: '',
        isActive: '',
        deletedBy: '',
        createdBy: 2,
        updatedBy: 2,
      },
    }
  },

  computed: {
    valid() {
      return (
        !!this.form.code &&
        !!this.form.maxDiscountPrice &&
        !!this.form.minAmount &&
        !!this.form.maxAmount &&
        !!this.form.percentage &&
        !!this.form.startDate &&
        !!this.form.endDate &&
        !!this.form.isActive
      )
    },
  },

  methods: {
    async addCategory() {
      try {
        await this.$axios.$post(`http://localhost:8080/discounts`, {
          code: this.form.code,
          percentage: this.form.percentage,
          maxDiscountPrice: this.form.maxDiscountPrice,
          minAmount: this.form.minAmount,
          maxAmount: this.form.maxAmount,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          isActive: this.form.isActive,
          createdBy: this.form.createdBy,
          updatedBy: this.form.updatedBy,
          deletedBy: this.form.deletedBy,
        })

        this.$toast.success('Successfully added to discount', {
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
        this.$toast.error('Add to discount failed', {
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
