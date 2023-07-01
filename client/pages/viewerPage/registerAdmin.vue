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
              label="Username"
              :rules="[rules.required, rules.minLength(5), rules.noSpaces]"
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
              label="Email"
              type="email"
              :rules="[rules.required, rules.email, rules.noSpaces]"
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
                rules.required,
                rules.minLength(8),
                rules.maxLength(20),
                rules.noSpaces,
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
              :rules="[rules.required, rules.minValue(0), rules.maxValue(5)]"
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
      <v-btn color="error" text to="/adminPage"> Close </v-btn>
      <v-btn color="primary" text :disabled="!isFormValid" @click="submit">Save</v-btn>
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

      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'Invalid email.',
        minLength: (length) => (value) =>
          (value && value.length >= length) ||
          `Must be at least ${length} characters.`,
        maxLength: (length) => (value) =>
          (value && value.length <= length) ||
          `Must be at most ${length} characters.`,
        minValue: (value) => (num) =>
          num === undefined || num >= value || `Must be at least ${value}.`,
        maxValue: (value) => (num) =>
          num === undefined || num <= value || `Must be at most ${value}.`,
        noSpaces: (value) => !/\s/.test(value) || 'Spaces are not allowed.',
      },
    }
  },

  computed: {
    isFormValid() {
      const { username, email, password, role } = this.form
      const isUsernameValid =
        !!username &&
        this.rules.noSpaces(username) === true &&
        this.rules.minLength(5)(username) === true
      const isEmailValid =
        !!email &&
        this.rules.noSpaces(email) === true &&
        this.rules.email(email) === true
      const isPasswordValid =
        !!password &&
        this.rules.noSpaces(password) === true &&
        this.rules.minLength(8)(password) === true &&
        this.rules.maxLength(20)(password) === true
      const isRoleValid =
        role !== null &&
        this.rules.minValue(0)(role) === true &&
        this.rules.maxValue(5)(role) === true
      return isUsernameValid && isEmailValid && isPasswordValid && isRoleValid
    },
  },

  mounted() {
    this.checkLogin()
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

<style></style>
