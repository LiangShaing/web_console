import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
