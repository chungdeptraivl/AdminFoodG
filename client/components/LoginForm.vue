<template>
  <div class="login-box">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <v-text-field
          v-model="form.username"
          type="text"
          label="Username"
          name="username"
          :rules="[
            (value) => !!value || 'This field is Required.',
            (value) => !/\s/.test(value) || 'Spaces are not allowed.',
          ]"
          class="input"
          hide-details="auto"
          required
        />

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
          class="input"
          hide-details="auto"
          required
          @click:append="showPassword = !showPassword"
        />
      </div>
      <nuxt-link
        to="/viewerPage/forgetPassword"
        class="forget"
        style="text-align: center; text-decoration: none; opacity: 0.8"
        >Forget Password</nuxt-link
      >
      <button :disabled="!valid" @click.prevent="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </button>
    </form>
  </div>
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
        password: '',
      },

      rules: [
        (value) => !!value || 'This field is Required.',
        (value) => (value && value.length >= 8) || 'Min 8 characters',
      ],

      showPassword: false
    }
  },

  computed: {
    valid() {
      return !!this.form.username && !!this.form.password
    },
  },

  methods: {
    async submit() {
      try {
        const dataForm = new FormData()

        dataForm.append('username', this.form.username)
        dataForm.append('password', this.form.password)

        await this.$axios.$post(`http://localhost:8080/admins/loginAdmin`, {
          username: this.form.username,
          password: this.form.password,
        })

        this.$toast('Login success, wellcome admin!', {
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

        // Chuyển hướng sang trang adminPage nếu đăng nhập thành công
        this.$router.push({
          path: '/adminPage',
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        // Báo lỗi và chỉ vào ô input nhập sai dữ liệu nếu đăng nhập thất bại
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

<style scoped>
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box .input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box .input:focus ~ label,
.login-box .user-box .input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  color: #03e9f4;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 25px #03e9f4,
    0 0 50px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

.forget:hover {
  color: rgb(26, 167, 255);
}
</style>
