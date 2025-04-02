import { createApp } from 'vue'
import '@/assets/scss/style.scss'
import App from '@/App.vue'

// Vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    components,
    directives,
})

import store from '@/store/index'
import router from '@/router/index'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
