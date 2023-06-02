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
                  (v && v.length >= 6) ||
                  'Username must be at least 6 characters',
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
              required
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
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.password"
              label="Password*"
              type="password"
              required
              :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  (v && v.length >= 8) ||
                  'Password must be at least 8 characters',
              ]"
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
            <v-text-field
              v-model="form.gender"
              label="Gender"
              type="boolean"
              required
            ></v-text-field>
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
    async submit() {
      try {
        const dataForm = new FormData()

        dataForm.append('username', this.form.username)
        dataForm.append('fullName', this.form.fullName)
        dataForm.append('password', this.form.password)
        dataForm.append('email', this.form.email)
        dataForm.append('birthday', this.form.birthday)
        dataForm.append('role', this.form.role)
        dataForm.append('gender', this.form.gender)
        // eslint-disable-next-line no-console
        console.log(dataForm.entries())

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

        this.$router.push({
          path: '/viewerPage/checkOtp',
          query: { username: this.form.username },
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
