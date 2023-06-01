<template>
    <v-col cols="12" md="12" class="mb-4 ml-4">
      <v-card>
        <v-card-body class="px-3 py-4-5">
          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" md="4">
              <v-icon class="d-flex justify-center align-center eye"
                >mdi-account</v-icon
              >
            </v-col>
            <v-col cols="12" md="8">
              <h3 class="text-muted font-semibold">N.T.Chung</h3>
              <h5 class="font-extrabold mb-0" style="color: coral">
                thanhchung@gmail.com
              </h5>
            </v-col>
          </v-row>
        </v-card-body>
      </v-card>
    </v-col>
  </template>
  
  <script>
  export default {
    data() {
      return {
   
      }
    },
    
  }
  </script>
  <style scoped>
  .eye {
    padding: 8px 0px;
    margin-left: 10px;
    font-size: 30px;
    border-radius: 4px;
    background-color: #198754;
  }
  </style>
  