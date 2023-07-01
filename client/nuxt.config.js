import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Server configuration
  server: {
    host: '127.0.0.1',
    port: 3000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - admin-foodg',
    title: 'admin-foodg',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  vuex: {
    createStore: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/i18n',
  ],

  // Cấu hình chung cho i18n
  i18n: {
    langDir: 'locales',
    locales: [
    {
      code: 'en',
      iso:'en',
      name:'English',
      file: 'en.json'
    },
    {
      code: 'vi',
      iso:'vi',
      name:'Vietnam',
      file: 'vi.json'
    },
  ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      // Đổi đường dẫn đến thư mục lang của bạn
      // messages: {
      //   en: require('./lang/en.json'),
      //   vi: require('./lang/vi.json'),
      // },
    },
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  axios: { proxy: true },
  proxy: {
    '/api/': {
      target: 'http://localhost:8080',
      pathRewrite: { '^/api/': '' },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},


}
