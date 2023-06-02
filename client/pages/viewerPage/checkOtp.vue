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
    <v-card-title>
      Check your email, we sent an OTP
    </v-card-title>
      <v-col cols="12">
        <div class="ma-auto" style="max-width: 300px">
          <v-otp-input v-model="form.otp" :length="length" dark></v-otp-input>
        </div>
      </v-col>

      <v-col cols="12">
        <v-btn color="success" block @click.prevent="submit">Submit</v-btn>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      otp: '',
    },
    username: '',
    length: 6,
  }),

  mounted() {
    const username = this.$route.query.username
    // eslint-disable-next-line no-console
    console.log(username)
  },

  methods: {
    async submit() {
      try {
        const dataForm = new FormData()

        dataForm.append('otp', this.form.otp)

        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

        // eslint-disable-next-line no-console
        console.log(this.form)
        await this.$axios.$put(
          `http://localhost:8080/admins/checkotp?otp=${this.form.otp}`,
          {
            username: this.$route.query.username,
          }
        )

        this.$router.push('/employeeDashboard')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>
