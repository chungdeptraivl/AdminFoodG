<template>
  <div>
    <v-list>
      <v-list-item v-for="(user, index) in users" :key="index">
        <v-avatar size="lg">
          <v-icon>{{ user.avatar }}</v-icon>
        </v-avatar>
        <v-list-item-content class="ms-4">
          <v-list-item-title class="mb-1">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-muted mb-0">{{
            user.username
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
      users: [
        {
          name: 'Hank Schrader',
          username: '@johnducky',
          avatar: 'mdi-account',
        },
        {
          name: 'Dean Winchester',
          username: '@imdean',
          avatar: 'mdi-account',
        },
        {
          name: 'John Dodol',
          username: '@dodoljohn',
          avatar: 'mdi-account',
        },
        {
          name: 'Dean Winchester',
          username: '@imdean',
          avatar: 'mdi-account',
        },
        {
          name: 'John Dodol',
          username: '@dodoljohn',
          avatar: 'mdi-account',
        },
        {
          name: 'Dean Winchester',
          username: '@imdean',
          avatar: 'mdi-account',
        },
        {
          name: 'John Dodol',
          username: '@dodoljohn',
          avatar: 'mdi-account',
        },
      ],
    }
  },
  methods: {
    startConversation() {
      // Handle start conversation button click
    },
  },
}
</script>

<style>
/* Add any custom styles here */
</style>
