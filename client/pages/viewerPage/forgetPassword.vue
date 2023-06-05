<template dark>
  <v-card class="container wrapper">
    <v-card-title class="headline">Confirm Box</v-card-title>
    <v-card-text>
      Using your email register admin to change password
    </v-card-text>
    <v-text-field
      v-model="form.email"
      style="width: 100%"
      class="container"
      label="Email"
      type="email"
      required
      :rules="[
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        (value) => !/\s/.test(value) || 'Spaces are not allowed.',
      ]"
    />
    <v-text-field
      v-model="form.password"
      style="width: 100%"
      class="container"
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      label="New Password"
      name="password"
      :rules="[
        (value) => !!value || 'This field is Required.',
        (value) => (value && value.length >= 8) || 'Min 8 characters',
        (value) => !/\s/.test(value) || 'Spaces are not allowed.',
      ]"
      hide-details="auto"
      required
      @click:append="showPassword = !showPassword"
    />
    <v-card-actions class="mt-4">
      <v-btn color="warning" text to="/">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="submit">Next</v-btn>
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
  layout: 'layoutHome',
  data: () => ({
    form: {
      email: '',
    },

    showPassword: false,
  }),

  computed: {
    valid() {
      const { email, password } = this.form
      const emailValid = !!email && /.+@.+\..+/.test(email)
      const passwordValid =
        !!password && password.length >= 8 && !/\s/.test(password)

      return emailValid && passwordValid
    },
  },

  methods: {
    async submit() {
      try {
        const dataForm = new FormData()

        dataForm.append('email', this.form.email)
        dataForm.append('password', this.form.password)
        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$patch(
          `http://localhost:8080/admins/forgetPassword`,
          {
            email: this.form.email,
            password: this.form.password,
          }
        )

        this.$toast('Confirm done, now waiting OTP', {
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
          path: '/viewerPage/checkOtpNewPass',
          query: { email: this.form.email, password: this.form.password },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.$toast.error(
          'Email does not exist in the list of staff management ',
          {
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
          }
        )
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  padding: 8px 8px 16px 8px;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
