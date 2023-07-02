<template>
  <v-col cols="12" md="12" class="mb-4 ml-4">
    <v-card class="px-5 py-6" @click.prevent="showModal">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" md="4">
          <v-icon class="d-flex justify-center align-center eye"
            >mdi-account</v-icon
          >
        </v-col>
        <v-col cols="12" md="8">
          <h3 class="text-muted font-semibold">{{ user.username }}</h3>
          <h5 class="font-extrabold mb-0" style="color: coral">
            {{ user.email }}
          </h5>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="closeModal" max-width="500">
      <v-card>
        <v-card-title class="headline">If you are Super Admin</v-card-title>
        <v-card-text> Confirm Super Admin's password to continute </v-card-text>
        <div class="d-flex flex-column align-start">
          <input
            v-model="password"
            type="password"
            placeholder="Enter Password"
            class="confirmPassword"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success"  text @click="login">Submit</v-btn>
          <v-btn color="error" text @click="closeModal = false">Exit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      password: '',
      closeModal: false,
    }
  },

  mounted() {
    this.getAdmins()
  },

  methods: {
    async getAdmins() {
      try {
        const response = await this.$axios.$get(`api/admins`)
        this.user = response.data[0]
        // eslint-disable-next-line no-console
        console.log(response.data)
        // eslint-disable-next-line no-console
        console.log(this.user)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    showModal() {
      this.closeModal = true
    },

    login() {
      if (this.password === '22092003') {
        this.showModal = false
        this.password = ''
        this.$router.push('/viewerPage/registerAdmin')
      } else if (this.password === '') {
        alert('Password is not space-separated')
      } else {
        alert('Password was wrong')
      }
    },
  },
}
</script>
<style scoped>
.eye {
  padding: 8px 0px;
  font-size: 30px;
  border-radius: 4px;
  background-color: #198754;
}
.confirmPassword {
  padding: 6px;
  margin: 4px 20px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: #fff;
  font-size: 20px;
}
</style>
