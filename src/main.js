import { createApp } from "vue";
import App from "./App.vue";
import { mdiDelete, mdiPencil } from '@mdi/js';
import mdiVue from 'mdi-vue/v3';

createApp(App).use(mdiVue, {
    icons: {
        mdiDelete,
        mdiPencil,
    },
})
.mount("#app");
