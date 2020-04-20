const pkg = require('./package');

module.exports = {
  /*
  ** Basic configuration
  */
  mode: 'universal',

  srcDir: 'src/',
  extension: ['js', 'ts'],

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#2e2e2e',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/sass/main.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '~/modules/typescript',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'ru',
          name: 'Русский'
        },
      ],
      defaultLocale: 'ru',
      strategy: 'no_prefix',
      vueI18nLoader: true,
      seo: true,
      vueI18n: {
        fallbackLocale: 'en',
      }
    }],
  ],
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {},
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
};
