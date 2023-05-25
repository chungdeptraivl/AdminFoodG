<template>
  <div>
    <v-menu offset-y min-width="200" max-width="250">
      <template #activator="{ on }">
        <v-list-item v-on="on">
          <v-list-item-avatar>
            <img
              src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/344864201_212139854909428_5362845435004176587_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7QyO6guN_TQAX_mR86g&_nc_ht=scontent.fhan18-1.fna&oh=00_AfDMuZOHynWizI2OHeFifGOEpGw23t4xllz9A4dDW1aSZg&oe=6466C7D5"
              alt="Chung"
            />
          </v-list-item-avatar>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item>
      </template>
        <v-list :lines="false" density="compact">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/344864201_212139854909428_5362845435004176587_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7QyO6guN_TQAX_mR86g&_nc_ht=scontent.fhan18-1.fna&oh=00_AfDMuZOHynWizI2OHeFifGOEpGw23t4xllz9A4dDW1aSZg&oe=6466C7D5"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-title> Nguyen Thanh Chung </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :value="menuItem"
            active-color="primary"
          >
            <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      menuItems: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }
  },
  methods: {
    logout() {
      // Xử lý logout
    },
  },
}
</script>
