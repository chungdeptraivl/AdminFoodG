<template>
  <v-card>
    <v-card-title>
      Employee Table
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.prevent="showModal"
        >Add admins</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="admins"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right',
      }"
    >
      <template slot="item.avatar" slot-scope="{ item }">
        <v-avatar
          :src="item.avatar"
          :alt="item.name"
          width="50"
          height="50"
        ></v-avatar>
      </template>

      <!-- <template slot="item.delete" slot-scope="{ item }">
        <v-btn color="error" @click="openDelete(item.id)"> Delete </v-btn>
      </template> -->
    </v-data-table>
    <!-- <v-dialog v-model="deleteDialogVisible" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="deleteProduct(id)">Yes</v-btn>
          <v-btn color="error" text @click="deleteDialogVisible = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="closeModal" max-width="500">
      <v-card>
        <v-card-title class="headline">If you are Super Admin</v-card-title>
        <v-card-text>Confirm Super Admin's password to continute </v-card-text>
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password"
          class="confirmPassword"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="login">Submit</v-btn>
          <v-btn color="error" text @click="closeModal = false">Exit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      admins: [],
      loading: true,
      deleteDialogVisible: false,
      password: '',
      closeModal: false,
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Avatar', value: 'avatar' },
        { text: 'Fullname', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Birthday At', value: 'birthday' },
        { text: 'Updated At', value: 'updatedAt' },
        // { text: 'Role', value: 'role' },
        // { text: 'Delete', value: 'delete', align: 'center', sortable: false },
      ],
    }
  },

  mounted() {
    this.getadmins()
    this.checkLogin()
  },

  methods: {
    async getadmins() {
      try {

        const response = await this.$axios.$get(`/api/admins`)
        response.data.forEach((admin) => {
          admin.createdAt = new Date(admin.createdAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          admin.updatedAt = new Date(admin.updatedAt)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
          admin.birthday = new Date(admin.birthday)
            .toISOString()
            .split('T')
            .join(' ')
            .split('.')[0]
        })
        this.admins = response.data
        // eslint-disable-next-line no-console
        console.log(this.admins)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
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
      } else {
        alert('Wrong password')
      }
    },

    async checkLogin() {
      try {
        const response = await this.$axios.get(`/api/checkLogin`)
        // eslint-disable-next-line no-console
        console.log(response)
        if (response.data === 'chua_dang_nhap') {
          // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
          this.$router.push('/')
        }
      } catch (e) {
        // Xử lý lỗi
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
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
