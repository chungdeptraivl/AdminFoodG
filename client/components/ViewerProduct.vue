<template>
  <v-col cols="12" md="3" class="mb-4">
    <v-card>
      <v-card-body class="px-3 py-4-5">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" md="4">
            <v-icon class="d-flex justify-center align-center eye"
              >mdi-domain</v-icon
            >
          </v-col>
          <v-col cols="12" md="8">
            <h4 class="text-muted font-semibold">List Product</h4>
            <h3 class="font-extrabold mb-0" style="color: coral">
              {{ productCount }}
            </h3>
          </v-col>
        </v-row>
      </v-card-body>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    productCount: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style scoped>
.eye {
  padding: 6px 8px;
  margin-left: 10px;
  font-size: 30px;
  border-radius: 4px;
  background-color: #20c997;
}
</style>
