<template>
  <v-col cols="12" md="3" class="mb-4">
    <v-card class="px-5 py-6" :to="'/customerDashboard'" nuxt>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" md="4">
            <v-icon class="d-flex justify-center align-center eye"
              >mdi-eye</v-icon
            >
          </v-col>
          <v-col cols="12" md="8">
            <h4 class="text-muted font-semibold">Customers</h4>
            <h3 class="font-extrabold mb-0" style="color: coral">
              {{ customerCount }}
            </h3>
          </v-col>
        </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    customerCount: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style scoped>
.eye {
  padding: 6px 8px;
  font-size: 30px;
  border-radius: 4px;
  background-color: #9694ff;
}
</style>