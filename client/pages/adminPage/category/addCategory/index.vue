<template>
  <v-container>
    <h1 style="text-align: center">Add Category</h1>
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
                v-model="form.icon"
                class="mb-6"
                label="Icon"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" @click.prevent="addCategory()"
          >Save</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="success" to="/categoryDashboard"
          >Back CategoryTable</v-btn
        >
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
        icon: '',
        createdBy: 2,
        updatedBy: 2,
      },
    }
  },

  computed: {
    valid() {
      return !!this.form.name
    },
  },

  methods: {
    async addCategory() {
      try {
        const dataForm = new FormData()

        dataForm.append('name', this.form.name)
        dataForm.append('icon', this.form.icon)
        dataForm.append('createdBy', this.form.createdBy)
        dataForm.append('updatedBy', this.form.updatedBy)
        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$post(`http://localhost:8080/categories`, {
          name: this.form.name,
          icon: this.form.icon,
          createdBy: this.form.createdBy,
          updatedBy: this.form.updatedBy,
        })

        this.$toast.success('Successfully added to category', {
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

        this.$router.push('/categoryDashboard')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.response.data)
        this.$toast.error('Add to category failed', {
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
