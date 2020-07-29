import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)
import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ef5d50',
                secondary: '#00796b',
                anchor: '#8c9eff',
                background: colors.indigo, // Not automatically applied
            },
        },
    },
})

export default vuetify