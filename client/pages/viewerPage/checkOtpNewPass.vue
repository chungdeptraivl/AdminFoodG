<template>
  <v-container fluid>
    <v-card
      style="
        padding: 16px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <v-card-title> Check your email, we sent an OTP </v-card-title>
      <v-col cols="12">
        <div class="ma-auto" style="max-width: 300px">
          <v-otp-input v-model="form.otp" :length="length" dark></v-otp-input>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          color="success"
          block
          :disabled="!isValidOTP"
          @click.prevent="submit"
          >Submit</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-btn color="warning" text block @click.prevent="resend"
          >Resend OTP{{ remainingTime ? ` (${remainingTime}s)` : '' }}</v-btn
        >
      </v-col>
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
  layout: 'layoutHome',

  data: () => ({
    form: {
      otp: '',
    },

    length: 6,

    remainingTime: 60,
    intervalId: null,
  }),

  computed: {
    isValidOTP() {
      return this.form.otp && this.form.otp.length === this.length
    },
  },

  mounted() {
    this.startCountdown()
  },

  beforeDestroy() {
    this.stopCountdown()
  },

  methods: {
    startCountdown() {
      this.remainingTime = 60
      this.intervalId = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--
        } else {
          clearInterval(this.intervalId)
        }
      }, 1000)
    },
    stopCountdown() {
      clearInterval(this.intervalId)
    },

    async submit() {
      try {
        const response = await this.$axios.$put(
          `http://localhost:8080/admins/checkotp?otp=${this.form.otp}`,
          {
            email: this.$route.query.email,
            password: this.$route.query.password,
          }
        )

        if (response.status === 'OK') {
          this.$toast(
            'Your password has been changed, please login again to get started',
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

          // chuyển hướng trang khi người dùng nhập đúng
          this.$router.push({
            path: '/',
          })

          this.stopCountdown()
        } else {
          // hiển thị thông báo lỗi nhập sai
          this.$toast.error('Incorrect OTP, please re-enter', {
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
          this.form.otp = ''
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.$toast.warning(
          'The OTP you entered has expired after 1 minute. Please resend a new OTP!!',
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
        this.form.otp = ''
      }
    },

    async resend() {
      try {
        await this.$axios.$patch(`http://localhost:8080/admins/forgetPassword`, {
          password: this.$route.query.password,
          email: this.$route.query.email,
        })
        this.form.otp = ''

        this.$toast('Waiting OTP is resending...', {
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

        this.startCountdown()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.$toast.error('Opp!!! Something was wrong', {
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
