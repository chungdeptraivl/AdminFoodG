<template>
  <v-select
    v-model="selectedLanguage"
    :items="languages"
    item-text="name"
    item-value="code"
    label="Select language"
    @change="changeLanguage"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: 'en',
      languages: [
        { code: 'en', name: 'English' },
        { code: 'vi', name: 'Tiếng Việt' },
        { code: 'fr', name: 'Français' },
      ],
    }
  },

  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
    },
  },
}
</script>

