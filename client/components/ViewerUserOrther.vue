<template>
  <div>
    <v-list>
      <v-list-item v-for="(user, index) in users" :key="index">
        <v-avatar size="lg">
          <v-icon>{{ user.avatar }}</v-icon>
        </v-avatar>
        <v-list-item-content class="ms-4">
          <v-list-item-title class="mb-1">{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle class="text-muted mb-0">{{
            user.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      try {
        const response = await this.$axios.$get(`/api/admins`)
        
        this.users = response.data
        // eslint-disable-next-line no-console
        console.log(this.users)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>
/* Add any custom styles here */
</style>
