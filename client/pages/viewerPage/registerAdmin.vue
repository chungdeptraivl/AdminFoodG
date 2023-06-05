<template>
  <v-card class="mt-6">
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="form.username"
              label="Legal Username*"
              required
              :rules="[
                (v) => !!v || 'Username is required',
                (v) =>
                  (v && v.length >= 5) ||
                  'Username must be at least 5 characters',
                (value) => !/\s/.test(value) || 'Spaces are not allowed.',
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="form.fullName"
              label="Legal Fullname"
              required
              :rules="[
                (v) => !!v || 'Fullname is required',
                (v) =>
                  (v && v.length >= 3) ||
                  'Fullname must be at least 3 characters',
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="form.birthday"
              label="Birth date"
              type="date"
              :rules="[checkDate]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              label="Email*"
              type="email"
              required
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                (value) => !/\s/.test(value) || 'Spaces are not allowed.',
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              name="password"
              :rules="[
                (value) => !!value || 'This field is Required.',
                (value) => (value && value.length >= 8) || 'Min 8 characters',
                (value) => !/\s/.test(value) || 'Spaces are not allowed.',
              ]"
              hide-details="auto"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.role"
              label="Role"
              type="number"
              required
              :rules="[
                (v) => !!v || 'Role is required',
                (v) =>
                  (v && v >= 1 && v <= 10) || 'Role must be between 1 and 10',
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.gender"
              :items="genderOptions"
              label="Gender"
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <small style="color: red"
        >*<span style="color: #fff"> indicates required field</span></small
      >
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text to="/adminPage"> Close </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!valid"
        @click.prevent="submit"
      >
        Save
      </v-btn>
    </v-card-actions>
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
      form: {
        username: '',
        fullName: '',
        password: '',
        email: '',
        birthday: '',
        role: '',
        gender: '',
      },

      genderOptions: [
        { text: 'Male', value: true },
        { text: 'Female', value: false },
      ],

      showPassword: false,
    }
  },

  computed: {
    valid() {
      return (
        !!this.form.username &&
        !!this.form.fullName &&
        !!this.form.password &&
        !!this.form.email &&
        !!this.form.role
      )
    },
  },

  methods: {
    checkDate(value) {
      const minDate = new Date()
      minDate.setFullYear(minDate.getFullYear() - 80)

      const maxDate = new Date()
      maxDate.setFullYear(maxDate.getFullYear() - 18)

      const inputDate = new Date(value)

      if (inputDate > maxDate) {
        return 'You must be at least 18 years old.'
      }

      if (inputDate < minDate) {
        return 'You must be less than 80 years old.'
      }

      return true
    },

    async submit() {
      try {
        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$post(`http://localhost:8080/admins/register`, {
          username: this.form.username,
          fullName: this.form.fullName,
          password: this.form.password,
          email: this.form.email,
          birthday: this.form.birthday,
          role: this.form.role,
          gender: this.form.gender,
        })

        this.$toast('Registor done, now waiting OTP', {
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

        this.$router.push({
          path: '/viewerPage/checkOtp',
          query: {
            username: this.form.username,
            fullName: this.form.fullName,
            password: this.form.password,
            email: this.form.email,
            birthday: this.form.birthday,
            role: this.form.role,
            gender: this.form.gender,
          },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        this.$toast.error(error.response.data.message, {
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
  },
}
</script>

<style></style>
