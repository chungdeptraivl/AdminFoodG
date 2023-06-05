<template>
  <v-card class="mx-auto my-6" style="max-width: 500px">
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular">
        Login Form</v-card-title
      >
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        :rules="[rules.required, rules.length(8)]"
        filled
        color="deep-purple"
        counter="8"
        label="Username"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'layoutHome',

  data: () => ({
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      email: (v) => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: (len) => (v) =>
        (v || '').length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
      required: (v) => !!v || 'This field is required',
    },
  }),
}
</script>
